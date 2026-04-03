{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    });
  }, []);

  return { users };
};

export default useAwareness;