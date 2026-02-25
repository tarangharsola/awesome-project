{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface UsersProps {
  users: { username: string; color: string; }[];
}

const useUsers = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState(users);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveUsers(users);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [users]);

  return activeUsers;
}

export default useUsers;