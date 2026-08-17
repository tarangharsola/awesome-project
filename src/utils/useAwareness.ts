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
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    const handleCursorUpdate = (cursorPosition) => {
      setCursorPositions((prevCursorPositions) => {
        const updatedCursorPositions = { ...prevCursorPositions, [cursorPosition.userId]: cursorPosition.position };
        return updatedCursorPositions;
      });
    };

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'userJoin':
          handleUserJoin(message.user);
          break;
        case 'userLeave':
          handleUserLeave(message.user);
          break;
        case 'cursorUpdate':
          handleCursorUpdate(message.cursorPosition);
          break;
        default:
          break;
      }
    };

    return () => {
      // Clean up
    };
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;