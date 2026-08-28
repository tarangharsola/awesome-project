import { useEffect, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { User, WebSocketMessage } from '../types';

export interface UseUsersOptions {
  roomId: string;
  username: string;
  color: string;
}

export function useUsers({ roomId, username, color }: UseUsersOptions) {
  const { status, sendMessage, latestMessage } = useWebSocket({ url: `${process.env.REACT_APP_WS_URL}/${roomId}` });
  const [users, setUsers] = useState<User[]>([]);

  // Notify server of new user
  useEffect(() => {
    if (status === 'CONNECTED') {
      const joinMsg: WebSocketMessage = { type: 'JOIN', payload: { username, color } };
      sendMessage(joinMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Handle incoming messages
  useEffect(() => {
    if (!latestMessage) return;
    const { type, payload } = latestMessage;
    switch (type) {
      case 'USER_LIST':
        setUsers(payload as User[]);
        break;
      case 'USER_JOIN':
        setUsers((prev) => [...prev, payload as User]);
        break;
      case 'USER_LEAVE':
        setUsers((prev) => prev.filter((u) => u.id !== (payload as User).id));
        break;
      default:
        break;
    }
  }, [latestMessage]);

  return { users, connectionStatus: status };
}
