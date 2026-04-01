{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false
    };

    const ws = new WebSocket(wsUrl, wsOptions);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'users') {
        setUsers(message.users);
      } else if (message.type === 'cursorPositions') {
        setCursorPositions(message.cursorPositions);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    users,
    cursorPositions
  };
};

export default useAwareness;