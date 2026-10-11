import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import { useDispatch, useSelector } from 'react-redux';
import { applyRemoteOps } from '../store/editorActions';
import { RootState } from '../store';
import { CollaborationMessage } from '../types/collaborationMessage';
import { User } from '../types';
import { store } from '../store'; // Assuming a singleton store export

/**
 * Core collaboration hook that wires the resilient WebSocket to the Redux store.
 * It handles join, operation, presence, and sync messages, and guarantees that
 * pending local operations are replayed after a reconnection.
 */
export function useCollaborationCore(roomId: string, user: User) {
  const dispatch = useDispatch();
  const editorState = useSelector((state: RootState) => state.editor);
  const pendingOps = useRef<CollaborationMessage[]>([]);

  const { send, connected, attempt } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}/${roomId}`,
    (event) => {
      const msg: CollaborationMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'operation':
          dispatch(applyRemoteOps(msg.payload));
          break;
        case 'presence':
          // Presence handling is done in a separate hook (usePresence)
          break;
        case 'sync':
          // Full document sync after reconnection
          dispatch({ type: 'EDITOR_SET_STATE', payload: msg.payload });
          // Replay any ops that were queued while offline
          pendingOps.current.forEach((op) => send(op));
          pendingOps.current = [];
          break;
        default:
          // Unknown message type – ignore safely
          break;
      }
    }
  );

  // Send a join message whenever the socket becomes ready
  useEffect(() => {
    if (connected) {
      const joinMsg: CollaborationMessage = {
        type: 'join',
        roomId,
        user,
      };
      send(joinMsg);
    }
  }, [connected, roomId, user, send]);

  // Subscribe to local editor actions and forward them as operations
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const lastAction = (store.getState() as any).lastAction;
      if (lastAction?.type === 'EDITOR_LOCAL_EDIT') {
        const opMsg: CollaborationMessage = {
          type: 'operation',
          roomId,
          user,
          payload: lastAction.payload,
        };
        if (connected) {
          send(opMsg);
        } else {
          pendingOps.current.push(opMsg);
        }
      }
    });
    return unsubscribe;
  }, [connected, roomId, user, send]);

  // When a reconnection occurs (attempt > 0) request a full sync from the server
  useEffect(() => {
    if (connected && attempt > 0) {
      const syncReq: CollaborationMessage = {
        type: 'syncRequest',
        roomId,
        user,
      };
      send(syncReq);
    }
  }, [connected, attempt, roomId, user, send]);
}
