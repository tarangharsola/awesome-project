import { useEffect, useState, useCallback } from 'react';
import type { User } from '../types';
import type { WebSocketMessage } from '../types/websocketMessage';
import { useWebSocket } from './useWebSocket';

/**
 * Hook to keep user awareness (presence & cursor) consistent across reconnections.
 */
export function useAwareness(roomUrl: string, localUser: User) {
  const { ws, connected, sendMessage } = useWebSocket(roomUrl, localUser);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [cursors, setCursors] = useState<Record<string, { line: number; ch: number }>>({});

  // Broadcast local cursor updates
  const broadcastCursor = useCallback(
    (position: { line: number; ch: number }) => {
      if (!connected) return;
      const msg: WebSocketMessage = { type: 'cursor', payload: { userId: localUser.id, position } };
      sendMessage(msg);
    },
    [connected, sendMessage, localUser.id]
  );

  // Handle incoming messages
  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event: MessageEvent) => {
      const msg: WebSocketMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'presence': {
          const { user } = msg.payload as { user: User };
          setUsers((prev) => ({ ...prev, [user.id]: user }));
          break;
        }
        case 'presence-leave': {
          const { userId } = msg.payload as { userId: string };
          setUsers((prev) => {
            const { [userId]: _, ...rest } = prev;
            return rest;
          });
          setCursors((prev) => {
            const { [userId]: _, ...rest } = prev;
            return rest;
          });
          break;
        }
        case 'cursor': {
          const { userId, position } = msg.payload as { userId: string; position: { line: number; ch: number } };
          setCursors((prev) => ({ ...prev, [userId]: position }));
          break;
        }
        default:
          break;
      }
    };
    ws.addEventListener('message', handleMessage);
    return () => ws.removeEventListener('message', handleMessage);
  }, [ws]);

  // Re‑announce presence after reconnection
  useEffect(() => {
    if (connected) {
      sendMessage({ type: 'presence', payload: { user: localUser } });
    }
  }, [connected, sendMessage, localUser]);

  return { users, cursors, broadcastCursor } as const;
}
