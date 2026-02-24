{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [presence, setPresence] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'join') {
        setUsers([...users, data.user]);
        setPresence({ ...presence, [data.user]: true });
      } else if (data.type === 'leave') {
        setUsers(users.filter((user) => user !== data.user));
        setPresence({ ...presence, [data.user]: false });
      }
    });
  }, []);

  return { users, presence };
};

export default useAwareness;