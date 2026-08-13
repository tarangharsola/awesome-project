{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server.');
    };

    ws.onerror = (event) => {
      console.error(event);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { users, ws };
};

export default useAwareness;