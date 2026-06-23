{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const { socket } = useWebSocket();

  useEffect(() => {
    const handleSocketMessage = (message) => {
      if (message.type === 'users') {
        setUsers(message.data);
      }
    };

    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage);
    };
  }, []);

  return users;
};

export default useAwareness;