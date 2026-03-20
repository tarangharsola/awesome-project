{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('users', (users) => setUsers(users));

    ws.on('cursor', (cursor) => setCursor(cursor));

    return () => ws.destroy();
  }, []);

  return { users, cursor };
};

export default useAwareness;