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
      setUsers((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log('Disconnected from awareness service.');
    };

    ws.onerror = (event) => {
      console.error(event);
    };

    return () => {
      ws.close();
    };
  }, []);

  const addUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const removeUser = (user) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return { users, addUser, removeUser };
};

export default useAwareness;