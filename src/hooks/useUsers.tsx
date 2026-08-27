import { useEffect, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { User } from '../types';

export function useUsers(roomId: string, username: string) {
  const { socket, connected, sendMessage } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'USER_LIST':
          setUsers(data.payload);
          break;
        case 'USER_JOIN':
          setUsers((prev) => [...prev, data.payload]);
          break;
        case 'USER_LEAVE':
          setUsers((prev) => prev.filter((u) => u.id !== data.payload.id));
          break;
        default:
          break;
      }
    };
    socket.addEventListener('message', handleMessage);
    // announce self
    sendMessage({ type: 'USER_JOIN', payload: { id: socket?.url, name: username, color: generateColor(username) } });
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, username, sendMessage]);

  return { users, connected };
}

function generateColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}
