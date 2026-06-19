{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [presence, setPresence] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('message', (data) => {
      const { type, payload } = JSON.parse(data);
      if (type === 'users') {
        setUsers(payload);
      } else if (type === 'presence') {
        setPresence(payload);
      }
    });
  }, []);

  return { users, presence };
};

export default useAwareness;