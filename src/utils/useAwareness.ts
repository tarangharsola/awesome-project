{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
    };

    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.on('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'user_join') {
        handleUserJoin(message.user);
      } else if (message.type === 'user_leave') {
        handleUserLeave(message.user);
      }
    });
    return () => {
      ws.close();
    };
  }, []);

  return { users, ws };
};

export default useAwareness;