{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = WebSocket.getInstance();
    ws.on('users', (users) => setUsers(users));
    ws.on('cursorPositions', (cursorPositions) => setCursorPositions(cursorPositions));
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;