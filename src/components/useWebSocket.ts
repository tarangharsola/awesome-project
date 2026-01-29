import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [users, setUsers] = useState([]);
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'cursors') {
        setCursors(data.cursors);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return { users, cursors };
};

export default useWebSocket;