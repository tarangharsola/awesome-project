{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'cursorPositions') {
        setCursorPositions(data.cursorPositions);
      }
    };

    return () => {
      // Clean up
    };
  }, []);

  return {
    users,
    cursorPositions
  };
};
export default useAwareness;