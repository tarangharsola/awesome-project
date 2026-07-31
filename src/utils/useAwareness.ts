{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const handleUsers = (users) => {
      setUsers(users);
    };
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.on('users', handleUsers);
    return () => {
      ws.close();
    };
  }, []);

  return { users, ws };
};

export default useAwareness;