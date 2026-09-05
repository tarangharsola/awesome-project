import { useEffect, useRef, useCallback } from 'react';
import type { CursorData, UserAwarenessMessage } from '../types/websocketMessage';
import { useWebSocket } from './useWebSocket';

/**
 * Hook that manages user awareness (cursor position, selection, etc.)
 * and guarantees that the latest state is broadcast after reconnection.
 *
 * @param userId Unique identifier for the local user.
 * @param username Display name of the user.
 * @param color Hex colour assigned to the user.
 * @param wsUrl WebSocket endpoint.
 */
export function useAwareness(
  userId: string,
  username: string,
  color: string,
  wsUrl: string
) {
  const latestCursor = useRef<CursorData | null>(null);

  // Initialise WebSocket with a custom onMessage handler that only forwards
  // awareness messages to the consumer via the returned callback.
  const { sendMessage, connectionStatus } = useWebSocket(
    wsUrl,
    (msg) => {
      if (msg.type === 'awareness' && msg.payload.userId !== userId) {
        // Remote awareness – consumer can subscribe via the returned handler.
        if (onRemoteAwareness.current) onRemoteAwareness.current(msg as UserAwarenessMessage);
      }
    },
    () => {
      // On (re)connect we immediately broadcast the current cursor state so
      // that newly connected peers receive up‑to‑date awareness.
      if (latestCursor.current) {
        sendMessage({
          type: 'awareness',
          payload: {
            userId,
            username,
            color,
            cursor: latestCursor.current,
          },
        });
      }
    }
  );

  // Callback holder for external components to receive remote awareness updates.
  const onRemoteAwareness = useRef<(msg: UserAwarenessMessage) => void>();
  const setRemoteAwarenessHandler = useCallback((handler: (msg: UserAwarenessMessage) => void) => {
    onRemoteAwareness.current = handler;
  }, []);

  // Broadcast local cursor changes.
  const broadcastCursor = useCallback(
    (cursor: CursorData) => {
      latestCursor.current = cursor;
      const message: UserAwarenessMessage = {
        type: 'awareness',
        payload: {
          userId,
          username,
          color,
          cursor,
        },
      };
      sendMessage(message);
    },
    [sendMessage, userId, username, color]
  );

  // When the connection status flips back to "connected" after a disconnect,
  // ensure the most recent cursor is resent (in case the previous attempt was lost).
  useEffect(() => {
    if (connectionStatus === 'connected' && latestCursor.current) {
      sendMessage({
        type: 'awareness',
        payload: {
          userId,
          username,
          color,
          cursor: latestCursor.current,
        },
      });
    }
  }, [connectionStatus, sendMessage, userId, username, color]);

  return { broadcastCursor, setRemoteAwarenessHandler, connectionStatus } as const;
}
