import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import type { CollaborationMessage } from '../types/collaborationMessage';
import type { PresenceMessage } from '../types/presence';
import { applyRemoteOperation } from '../utils/conflict/strategies/crdt';
import { useDispatch } from 'react-redux';
import { updateDocument } from '../store/editorActions';
import { addUser, removeUser, setUsers } from '../store/usersActions';

interface UseCollaborationCoreParams {
  roomId: string;
  username: string;
  userColor: string;
}

/**
 * Core collaboration hook that wires the WebSocket to the Redux store.
 * It handles document operations, presence updates, and reconnection sync.
 */
export function useCollaborationCore({ roomId, username, userColor }: UseCollaborationCoreParams) {
  const dispatch = useDispatch();
  const { socket, sendMessage, connectionStatus } = useWebSocket(`${process.env.REACT_APP_WS_URL}/rooms/${roomId}`);

  // Keep track of whether we have performed an initial sync after a reconnect.
  const hasSyncedRef = useRef(false);

  // Send presence information whenever we (re)connect.
  const broadcastPresence = () => {
    const presence: PresenceMessage = {
      type: 'PRESENCE',
      roomId,
      user: { id: socket?.url ?? '', name: username, color: userColor },
    };
    sendMessage(presence);
  };

  // Request full document state from the server (used after reconnect).
  const requestSync = () => {
    const syncReq: CollaborationMessage = {
      type: 'SYNC_REQUEST',
      roomId,
    };
    sendMessage(syncReq);
  };

  // Handle incoming messages.
  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      const msg: CollaborationMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'OPERATION':
          // Apply remote operation using CRDT strategy with deduplication.
          const newDoc = applyRemoteOperation(msg.payload);
          dispatch(updateDocument(newDoc));
          break;
        case 'SYNC_RESPONSE':
          // Server sent the full document state.
          dispatch(updateDocument(msg.payload.document));
          // Also update the user list.
          dispatch(setUsers(msg.payload.users));
          hasSyncedRef.current = true;
          break;
        case 'PRESENCE':
          // Update user list based on presence events.
          if (msg.payload.action === 'JOIN') {
            dispatch(addUser(msg.payload.user));
          } else if (msg.payload.action === 'LEAVE') {
            dispatch(removeUser(msg.payload.user.id));
          }
          break;
        default:
          // No-op for unknown message types.
          break;
      }
    };
    socket.addEventListener('message', handleMessage);
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, dispatch]);

  // React to connection status changes for reconnection handling.
  useEffect(() => {
    if (connectionStatus === 'connected') {
      // On (re)connect, broadcast our presence and request a fresh sync.
      broadcastPresence();
      requestSync();
    } else if (connectionStatus === 'disconnected') {
      // Optimistically clear remote cursors; UI components can listen to status.
      // No direct action needed here; they will render based on missing presence.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  // Expose a function to send local operations.
  const sendLocalOperation = (op: any) => {
    const msg: CollaborationMessage = {
      type: 'OPERATION',
      roomId,
      payload: op,
    };
    sendMessage(msg);
  };

  return { sendLocalOperation, connectionStatus };
}
