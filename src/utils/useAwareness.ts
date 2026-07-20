{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
    };

    const handleCursorUpdate = (user, cursorPosition) => {
      setCursorPositions((prevCursorPositions) => {
        const newCursorPositions = { ...prevCursorPositions, [user]: cursorPosition };
        return newCursorPositions;
      });
    };

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'userJoin') {
        handleUserJoin(message.user);
      } else if (message.type === 'userLeave') {
        handleUserLeave(message.user);
      } else if (message.type === 'cursorUpdate') {
        handleCursorUpdate(message.user, message.cursorPosition);
      }
    };

    return () => {
      // Clean up WebSocket
    };
  }, []);

  return {
    users,
    cursorPositions
  };
};

export default useAwareness;