{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const handleUsers = (users) => {
      setUsers(users);
    };

    const handleReconnection = () => {
      setWs(new WebSocket('ws://localhost:8080'));
    };

    return () => {
      // cleanup
    };
  }, []);

  return {
    users,
    ws,
    handleUsers,
    handleReconnection
  };
};

export default useAwareness;