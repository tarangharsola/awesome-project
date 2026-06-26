{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userJoin') {
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else if (data.type === 'userLeave') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data.userId));
      } else if (data.type === 'cursorPosition') {
        setCursorPositions((prevPositions) => {
          const newPosition = { ...prevPositions, [data.userId]: data.position };
          return newPosition;
        });
      }
    });
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;