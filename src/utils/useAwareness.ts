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

    const handleUpdate = (update) => {
      setUsers((prevUsers) => OT.applyUpdate(prevUsers, update));
    };

    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      if (update.type === 'user_join') {
        handleUserJoin(update.user);
      } else if (update.type === 'user_leave') {
        handleUserLeave(update.user);
      } else if (update.type === 'update') {
        handleUpdate(update.update);
      }
    };
    ws.onclose = () => {
      setWs(null);
    };
  }, []);

  return { users, ws };
};

export default useAwareness;