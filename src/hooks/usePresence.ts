import { useEffect, useState, useCallback } from 'react';
import { User } from '../types/presence';
import { CollaborationMessage } from '../types/collaborationMessage';
import { useWebSocket } from './useWebSocket';

/**
 * Hook that tracks user presence in a collaborative session.
 * It synchronizes the local user list with the server and ensures
 * consistency after reconnection by handling `presence_sync` messages.
 */
export function usePresence(
  wsUrl: string,
  localUser: User
) {
  const [users, setUsers] = useState<User[]>([localUser]);

  const handleMessage = useCallback(
    (msg: CollaborationMessage) => {
      switch (msg.type) {
        case 'user_join':
          setUsers((prev) => {
            if (prev.find((u) => u.id === msg.user.id)) return prev;
            return [...prev, msg.user];
          });
          break;
        case 'user_leave':
          setUsers((prev) => prev.filter((u) => u.id !== msg.user.id));
          break;
        case 'presence_sync':
          // Server sends the authoritative list of participants.
          setUsers(msg.users);
          break;
        default:
          // Ignore unrelated messages.
          break;
      }
    },
    []
  );

  const { status, sendMessage } = useWebSocket(wsUrl, handleMessage);

  // Notify the server when the local user joins.
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({ type: 'user_join', user: localUser } as CollaborationMessage);
    }
  }, [status, localUser, sendMessage]);

  // Clean up on unmount – inform server of leaving.
  useEffect(() => {
    return () => {
      if (status === 'connected') {
        sendMessage({ type: 'user_leave', user: localUser } as CollaborationMessage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users, connectionStatus: status } as const;
}
