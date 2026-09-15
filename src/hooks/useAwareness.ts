import { useEffect, useState } from 'react';
import type { User } from '../types';
import { useWebSocket } from './useWebSocket';

/**
 * Hook that tracks user presence (awareness) in a collaborative session.
 * It broadcasts the local user info and maintains a list of remote users.
 */
export function useAwareness(sessionId: string, localUser: User) {
  const wsUrl = `${window.location.origin.replace(/^http/, 'ws')}/ws/${sessionId}`;
  const { message, send, connected } = useWebSocket(wsUrl);
  const [users, setUsers] = useState<Record<string, User>>({ [localUser.id]: localUser });

  // Broadcast local user on connect or when user data changes
  useEffect(() => {
    if (connected) {
      send({ type: 'awareness', payload: localUser });
    }
  }, [connected, localUser, send]);

  // Handle incoming awareness messages
  useEffect(() => {
    if (!message) return;
    if (message.type !== 'awareness') return;
    const remote: User = message.payload;
    setUsers((prev) => ({ ...prev, [remote.id]: remote }));
  }, [message]);

  // Cleanup on unmount: inform others that we left
  useEffect(() => {
    return () => {
      send({ type: 'awareness-leave', payload: { id: localUser.id } });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users, connected } as const;
}
