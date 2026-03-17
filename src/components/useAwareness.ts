{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    const ws = new WebSocket(wsUrl, wsOptions);
    ws.on('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'userJoin') {
        handleUserJoin(message.user);
      } else if (message.type === 'userLeave') {
        handleUserLeave(message.user);
      }
    });
    setWs(ws);
    return () => ws.close();
  }, []);

  return { users, ws };
};

export default useAwareness;