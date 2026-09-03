import { useEffect, useState } from 'react';
import WebSocketManager from '../utils/websocketClient';
import { User } from '../types';
import { WebSocketMessage } from '../types/websocketMessage';

/**
 * Hook that maintains a consistent list of active users (awareness) for a collaborative session.
 * It listens to presence‑related messages from the WebSocketManager and updates local state.
 * It also provides a helper to broadcast the local cursor position.
 */
export function useAwareness(wsManager: WebSocketManager) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleMessage = (msg: WebSocketMessage) => {
      switch (msg.type) {
        case 'user-joined':
          setUsers((prev) => [...prev, msg.payload]);
          break;
        case 'user-left':
          setUsers((prev) => prev.filter((u) => u.id !== msg.payload.id));
          break;
        case 'cursor-update':
          setUsers((prev) =>
            prev.map((u) => (u.id === msg.payload.id ? { ...u, cursor: msg.payload.cursor } : u))
          );
          break;
        case 'presence-sync':
          setUsers(msg.payload.users);
          break;
        default:
          break;
      }
    };

    wsManager.addMessageHandler(handleMessage);
    // Request the current presence snapshot when the hook mounts.
    wsManager.send({ type: 'presence-request', payload: {} });

    return () => {
      wsManager.removeMessageHandler(handleMessage);
    };
  }, [wsManager]);

  const updateCursor = (cursor: any) => {
    wsManager.send({ type: 'cursor-update', payload: { cursor } });
  };

  return { users, updateCursor };
}
