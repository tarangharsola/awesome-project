{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useUsers = (userId: string) => {
  const [users, setUsers] = useState([]);
  const { send } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      send({ type: 'users', data: { users } });
    }, 100);
    return () => clearInterval(intervalId);
  }, [users, send]);

  return { users };
}

export default useUsers;