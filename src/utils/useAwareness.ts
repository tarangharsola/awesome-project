{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'cursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    });

    return () => {
      ws.destroy();
    };
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;