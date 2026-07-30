{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('message', (message) => {
      const { type, data } = JSON.parse(message);
      if (type === 'users') {
        setUsers(data);
      } else if (type === 'cursorPositions') {
        setCursorPositions(data);
      }
    });
    return () => ws.destroy();
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;