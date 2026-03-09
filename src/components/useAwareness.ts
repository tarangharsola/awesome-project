{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = { reconnect: true, retry: 3000 };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'users') {
        setUsers(message.users);
      }
    };

    ws.onopen = () => {
      setWs(ws);
    };

    ws.onclose = () => {
      setWs(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { users, ws };
};

export default useAwareness;