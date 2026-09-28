import { useEffect, useState, useCallback } from 'react';
import { UserPresence, PresenceMessage } from '../types/presence';
import useWebSocket from './useWebSocket';

export default function usePresence(sessionId: string, localUser: UserPresence) {
  const [users, setUsers] = useState<Record<string, UserPresence>>({ [localUser.id]: localUser });
  const ws = useWebSocket(sessionId);

  const handleMessage = useCallback((msg: PresenceMessage) => {
    switch (msg.type) {
      case 'user-joined':
        setUsers(prev => ({ ...prev, [msg.payload.id]: msg.payload }));
        break;
      case 'user-left':
        setUsers(prev => {
          const { [msg.payload.id]: _, ...rest } = prev;
          return rest;
        });
        break;
      case 'cursor-update':
        setUsers(prev => {
          const user = prev[msg.payload.id];
          if (!user) return prev;
          return {
            ...prev,
            [msg.payload.id]: { ...user, cursor: msg.payload.cursor },
          };
        });
        break;
    }
  }, []);

  useEffect(() => {
    if (!ws) return;
    const listener = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as PresenceMessage;
        handleMessage(data);
      } catch {}
    };
    ws.addEventListener('message', listener);
    // announce self on connect
    ws.send(JSON.stringify({ type: 'user-joined', payload: localUser }));
    return () => {
      ws.send(JSON.stringify({ type: 'user-left', payload: { id: localUser.id } }));
      ws.removeEventListener('message', listener);
    };
  }, [ws, localUser, handleMessage]);

  const updateCursor = useCallback(
    (cursor: { line: number; ch: number }) => {
      if (!ws) return;
      ws.send(JSON.stringify({ type: 'cursor-update', payload: { id: localUser.id, cursor } }));
    },
    [ws, localUser.id]
  );

  return { users, updateCursor };
}
