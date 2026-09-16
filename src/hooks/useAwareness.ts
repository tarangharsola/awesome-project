import { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type { User } from '../types';

/**
 * Hook to manage user awareness (presence) across the collaborative session.
 * It ensures that the local user is announced on connect and that remote
 * users are kept in sync, even after reconnections.
 */
export const useAwareness = (roomId: string, localUser: User) => {
  const { connected, lastMessage, sendMessage } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);
  const [users, setUsers] = useState<Record<string, User>>({});

  // Announce local user when connection becomes active
  useEffect(() => {
    if (connected) {
      sendMessage({ type: 'awareness', action: 'join', user: localUser });
    }
  }, [connected, localUser, sendMessage]);

  // Handle incoming awareness messages
  useEffect(() => {
    if (!lastMessage) return;
    const { type, action, user } = lastMessage;
    if (type !== 'awareness' || !user) return;
    setUsers(prev => {
      const updated = { ...prev };
      if (action === 'join' || action === 'update') {
        updated[user.id] = user;
      } else if (action === 'leave') {
        delete updated[user.id];
      }
      return updated;
    });
  }, [lastMessage]);

  // Clean up on unmount – inform others that we left
  useEffect(() => {
    return () => {
      if (connected) {
        sendMessage({ type: 'awareness', action: 'leave', user: localUser });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCursor = useCallback(
    (position: { line: number; ch: number }) => {
      if (connected) {
        sendMessage({ type: 'awareness', action: 'cursor', user: { ...localUser, cursor: position } });
      }
    },
    [connected, localUser, sendMessage]
  );

  return { users, updateCursor };
};
