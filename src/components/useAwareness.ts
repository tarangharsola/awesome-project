{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const { users: usersFromWebSocket } = useWebSocket();

  useEffect(() => {
    setUsers(usersFromWebSocket);
  }, [usersFromWebSocket]);

  return users;
};

export default useAwareness;