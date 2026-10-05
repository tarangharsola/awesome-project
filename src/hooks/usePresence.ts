import { useEffect, useState, useCallback } from 'react';
import { useWebSocket, ConnectionStatus } from './useWebSocket';
import { User } from '../types/presence';

interface UsePresenceOptions {
  roomId: string;
  username: string;
  color: string;
  wsUrl: string;
}

/**
 * Hook that tracks presence information (list of active users) for a collaborative room.
 * It automatically re‑requests the user list after a reconnection to guarantee awareness consistency.
 */
export function usePresence({ roomId, username, color, wsUrl }: UsePresenceOptions) {
  const [users, setUsers] = useState<User[]>([]);

  const handleMessage = useCallback(
    (msg: any) => {
      switch (msg.type) {
        case 'USER_JOIN':
          setUsers((prev) => [...prev, msg.user]);
          break;
        case 'USER_LEAVE':
          setUsers((prev) => prev.filter((u) => u.id !== msg.user.id));
          break;
        case 'USER_LIST':
          setUsers(msg.users);
          break;
        default:
          break;
      }
    },
    []
  );

  const { sendMessage, status } = useWebSocket({
    url: wsUrl,
    onMessage: handleMessage,
    getSyncMessage: () => ({ type: 'REQUEST_USERS', roomId }),
  });

  // Announce self on mount and clean up on unmount
  useEffect(() => {
    const joinMsg = { type: 'JOIN', roomId, user: { id: username, name: username, color } };
    sendMessage(joinMsg);
    return () => {
      const leaveMsg = { type: 'LEAVE', roomId, userId: username };
      sendMessage(leaveMsg);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the connection status changes to connected after a reconnect, request the latest user list.
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({ type: 'REQUEST_USERS', roomId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return { users, status };
}
