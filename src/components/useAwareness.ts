{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.on('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    });
    return () => ws.destroy();
  }, []);

  return { users };
};

export default useAwareness;