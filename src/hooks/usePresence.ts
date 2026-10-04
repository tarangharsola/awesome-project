import { useEffect, useMemo, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { PresenceMessage, UserPresence } from '../types/presence';
import { generateRandomColor } from '../utils';

type UsePresenceProps = {
  roomId: string;
  username: string;
};

export function usePresence({ roomId, username }: UsePresenceProps) {
  const [users, setUsers] = useState<UserPresence[]>([]);
  const color = useMemo(() => generateRandomColor(), []);

  const { sendMessage, status } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}/rooms/${roomId}`,
    (msg: PresenceMessage) => {
      switch (msg.type) {
        case 'presence':
          setUsers(msg.users);
          break;
        case 'join':
          setUsers((prev) => [...prev, msg.user]);
          break;
        case 'leave':
          setUsers((prev) => prev.filter((u) => u.id !== msg.user.id));
          break;
        default:
          // ignore unknown messages
          break;
      }
    }
  );

  // Announce self when connection becomes active
  useEffect(() => {
    if (status === 'connected') {
      const joinMsg: PresenceMessage = {
        type: 'join',
        user: { id: username, name: username, color },
        roomId,
      };
      sendMessage(joinMsg);
    }
  }, [status, sendMessage, username, color, roomId]);

  // Send leave message on unmount
  useEffect(() => {
    return () => {
      const leaveMsg: PresenceMessage = {
        type: 'leave',
        user: { id: username, name: username, color },
        roomId,
      };
      sendMessage(leaveMsg);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users, status } as const;
}
