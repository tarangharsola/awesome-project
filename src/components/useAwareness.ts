{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      if (event.data.type === 'userJoin') {
        setUsers((prevUsers) => [...prevUsers, event.data.user]);
      } else if (event.data.type === 'userLeave') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== event.data.userId));
      } else if (event.data.type === 'cursorPosition') {
        setCursorPositions((prevPositions) => {
          const newPosition = { [event.data.userId]: event.data.position };
          return { ...prevPositions, ...newPosition };
        });
      }
    };
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;