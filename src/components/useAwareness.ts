{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [presence, setPresence] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'presence') {
        setPresence(data.presence);
      }
    });
  }, []);

  return { users, presence };
};
export default useAwareness;