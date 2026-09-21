import { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type { User } from '../types';
import type { WebSocketMessage } from '../types/websocketMessage';

interface UseUsersOptions {
  sessionId: string;
  username: string;
  color: string;
}

/**
 * Hook that tracks user presence and cursor awareness for a collaborative session.
 * It ensures consistency across reconnects by requesting the current user list
 * from the server whenever the socket (re)connects.
 */
export function useUsers({ sessionId, username, color }: UseUsersOptions) {
  const [users, setUsers] = useState<Record<string, User>>({});

  const handleMessage = useCallback(
    (msg: WebSocketMessage) => {
      switch (msg.type) {
        case 'user-joined': {
          const { id, name, color: userColor } = msg.payload;
          setUsers((prev) => ({ ...prev, [id]: { id, name, color: userColor, cursor: null } }));
          break;
        }
        case 'user-left': {
          const { id } = msg.payload;
          setUsers((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
          break;
        }
        case 'cursor-update': {
          const { id, position } = msg.payload;
          setUsers((prev) => {
            const user = prev[id];
            if (!user) return prev;
            return { ...prev, [id]: { ...user, cursor: position } };
          });
          break;
        }
        case 'users-list': {
          // Full snapshot from server (used after reconnect)
          const list: User[] = msg.payload;
          const map: Record<string, User> = {};
          list.forEach((u) => (map[u.id] = u));
          setUsers(map);
          break;
        }
        default:
          // ignore unrelated messages
          break;
      }
    },
    []
  );

  const { sendMessage, isConnected } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}/${sessionId}`,
    onMessage: handleMessage,
    onOpen: () => {
      // Announce ourselves on (re)connect
      sendMessage({
        type: 'user-joined',
        payload: { name: username, color },
      });
      // Request the current user snapshot to sync state after a reconnect
      sendMessage({ type: 'request-users' });
    },
  });

  // Broadcast local cursor changes
  const broadcastCursor = useCallback(
    (position: { line: number; ch: number }) => {
      if (!isConnected) return;
      sendMessage({ type: 'cursor-update', payload: { position } });
    },
    [isConnected, sendMessage]
  );

  // Cleanup on unmount – inform server we are leaving
  useEffect(() => {
    return () => {
      if (isConnected) {
        sendMessage({ type: 'user-left' });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users, broadcastCursor, isConnected };
}
