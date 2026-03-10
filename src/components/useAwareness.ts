{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
    };

    const ws = new WebSocket(wsUrl, wsOptions);
    ws.onopen = () => {
      setWs(ws);
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'user_join') {
        handleUserJoin(message.user);
      } else if (message.type === 'user_leave') {
        handleUserLeave(message.user);
      }
    };
    ws.onclose = () => {
      setWs(null);
    };
    ws.onerror = () => {
      setWs(null);
    };

    return () => {
      ws?.close();
    };
  }, []);

  return { users, ws };
};

export default useAwareness;