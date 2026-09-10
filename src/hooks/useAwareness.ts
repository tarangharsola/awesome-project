// src/hooks/useAwareness.ts
import { useEffect } from 'react';
import type { User } from '../types';
import { useReconnection } from './useReconnection';
import type { WebSocketMessage } from '../types/websocketMessage';

export function useAwareness(
  url: string,
  user: User,
  onAwarenessUpdate: (users: Record<string, User>) => void
) {
  const handleMessage = (msg: WebSocketMessage) => {
    if (msg.type === 'awareness') {
      onAwarenessUpdate(msg.payload);
    }
  };

  const { connected, send } = useReconnection(url, handleMessage);

  // Announce self and request current awareness on (re)connect
  useEffect(() => {
    if (connected) {
      send({ type: 'join', payload: user });
      send({ type: 'awarenessRequest' });
    }
  }, [connected, send, user]);

  const broadcastCursor = (cursor: { line: number; ch: number }) => {
    send({ type: 'cursor', payload: { userId: user.id, cursor } });
  };

  return { connected, broadcastCursor };
}
