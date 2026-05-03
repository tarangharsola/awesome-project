{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Awareness {
  users: any[];
}

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleUsers = (users) => {
      setUsers(users);
    };

    webSocket.on('users', handleUsers);

    return () => {
      webSocket.off('users', handleUsers);
    };
  }, [webSocket]);

  return { users };
};

export default useAwareness;