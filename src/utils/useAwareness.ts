{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'userJoin') {
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else if (data.type === 'cursorUpdate') {
        setCursorPositions((prevPositions) => ({ ...prevPositions, [data.userId]: data.position }));
      }
    });
    return () => ws.close();
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;