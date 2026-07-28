{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useUsers = (userId: string) => {
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();

  useEffect(() => {
    const userUpdate = (data: { userId: string; users: { id: string; name: string; color: string }[] }) => {
      if (data.userId === userId) {
        setUsers(data.users);
      }
    };
    receive('userUpdate', userUpdate);
    return () => {
      receive('userUpdate', null);
    };
  }, []);

  return { users, setUsers };
}

export default useUsers;