{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const ws = new WebSocket(wsUrl);
    setWs(ws);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'users') {
        setUsers(message.users);
      } else if (message.type === 'cursorPositions') {
        setCursorPositions(message.cursorPositions);
      }
    };

    return () => ws.close();
  }, []);

  const handleUserJoin = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  const handleCursorMove = (user, position) => {
    setCursorPositions((prevPositions) => ({ ...prevPositions, [user]: position }));
  };

  return { users, cursorPositions, handleUserJoin, handleUserLeave, handleCursorMove };
};

export default useAwareness;