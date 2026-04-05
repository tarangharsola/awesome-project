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

    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => prevUsers.map((u) => u === user ? user : u));
    };

    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'user_join':
          handleUserJoin(message.user);
          break;
        case 'user_leave':
          handleUserLeave(message.user);
          break;
        case 'user_update':
          handleUserUpdate(message.user);
          break;
      }
    };
  }, []);

  return { users, ws };
};

export default useAwareness;