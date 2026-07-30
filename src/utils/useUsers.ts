{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useUsers = ({ userId }) => {
  const [users, setUsers] = useState({} as { [key: string]: string });
  const { send } = useWebSocket();

  useEffect(() => {
    const usersInterval = setInterval(() => {
      send({ type: 'users', data: { userId, users } });
    }, 100);
    return () => clearInterval(usersInterval);
  }, [userId, users, send]);

  return { users, setUsers };
}

export default useUsers;