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
      const data = JSON.parse(event.data);
      if (data.type === 'user_join') {
        handleUserJoin(data.user);
      } else if (data.type === 'user_leave') {
        handleUserLeave(data.user);
      }
    });
    return () => {
      ws.close();
    };
  }, []);

  return { users, ws };
};

export default useAwareness;