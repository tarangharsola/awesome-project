{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  roomId: string;
}

const useUsers = (roomId: string) => {
  const [users, setUsers] = useState([]);
  const { connect, disconnect } = useWebSocket(roomId);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUsers = [...users];
      newUsers.push({ id: 'new-user', name: 'New User', color: '#' + Math.floor(Math.random() * 16777215).toString(16) });
      setUsers(newUsers);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { users };
};

export default useUsers;