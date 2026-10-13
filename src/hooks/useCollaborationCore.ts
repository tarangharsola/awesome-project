import { useEffect, useRef, useState } from 'react';
import { useWebSocket, ConnectionStatus } from './useWebSocket';
import { CRDT } from '../utils/conflict/strategies/crdtCore';
import { usePresence } from './usePresence';
import { useConnectionStatus } from './useConnectionStatus';
import { CollaborationMessage, SyncResponseMessage, PresenceSyncMessage } from '../types/collaborationMessage';

/**
 * Core hook that wires together WebSocket communication, CRDT document state,
 * and presence awareness. It guarantees that after a reconnection the full
 * document and the list of active users are synchronised across all peers.
 */
export function useCollaborationCore(roomId: string, username: string, color: string) {
  const [doc, setDoc] = useState<string>('');
  const crdtRef = useRef<CRDT>(new CRDT());
  const clientIdRef = useRef<string>(`${username}-${Date.now()}`);
  const counterRef = useRef<number>(0);

  const { status: wsStatus, sendMessage } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}/${roomId}`,
    onMessage: handleIncomingMessage,
    maxRetries: 0,
    baseDelay: 500,
  });

  const { users, addUser, removeUser, updateUserCursor, setUsers } = usePresence();

  const { status: connectionStatus } = useConnectionStatus(wsStatus);

  function broadcast(msg: CollaborationMessage) {
    sendMessage(msg);
  }

  function handleIncomingMessage(raw: any) {
    const msg: CollaborationMessage = raw;
    switch (msg.type) {
      case 'insert':
        crdtRef.current.applyOperation(msg);
        setDoc(crdtRef.current.getDocument());
        break;
      case 'delete':
        crdtRef.current.applyOperation(msg);
        setDoc(crdtRef.current.getDocument());
        break;
      case 'cursor':
        updateUserCursor(msg.userId, msg.position);
        break;
      case 'join':
        addUser({ id: msg.userId, name: msg.username, color: msg.color, cursor: null });
        break;
      case 'leave':
        removeUser(msg.userId);
        break;
      case 'sync-response':
        handleSyncResponse(msg as SyncResponseMessage);
        break;
      case 'presence-sync-response':
        handlePresenceSync(msg as PresenceSyncMessage);
        break;
      default:
        console.warn('Unhandled collaboration message type', msg);
    }
  }

  function handleSyncResponse(msg: SyncResponseMessage) {
    // Reset CRDT and replay operations to guarantee deterministic state
    crdtRef.current = new CRDT();
    for (const op of msg.operations) {
      crdtRef.current.applyOperation(op);
    }
    setDoc(crdtRef.current.getDocument());
  }

  function handlePresenceSync(msg: PresenceSyncMessage) {
    // Replace local user list with authoritative list from the server
    setUsers(msg.users);
  }

  // Local edit actions -----------------------------------------------------
  function insertText(prevId: string | null, value: string) {
    const op = crdtRef.current.localInsert(prevId, value, clientIdRef.current, counterRef.current++);
    broadcast(op);
    setDoc(crdtRef.current.getDocument());
  }

  function deleteChar(id: string) {
    const op = crdtRef.current.localDelete(id);
    broadcast(op);
    setDoc(crdtRef.current.getDocument());
  }

  // Cursor broadcasting -----------------------------------------------------
  function broadcastCursor(position: number) {
    broadcast({ type: 'cursor', userId: clientIdRef.current, position });
  }

  // Presence announce on mount ---------------------------------------------
  useEffect(() => {
    if (connectionStatus === 'connected') {
      broadcast({ type: 'join', userId: clientIdRef.current, username, color });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus, username, color]);

  // Cleanup on unmount ------------------------------------------------------
  useEffect(() => {
    return () => {
      broadcast({ type: 'leave', userId: clientIdRef.current });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    doc,
    users,
    connectionStatus,
    insertText,
    deleteChar,
    broadcastCursor,
  };
}
