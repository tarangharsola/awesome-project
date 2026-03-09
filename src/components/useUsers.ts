{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'users') {
        setUsers(message.data);
      }
    };
  }, []);

  return { users };
};

export default useUsers;