{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('cursorUpdate', (data) => {
      setCursorPosition(data.cursorPosition);
      setUsername(data.username);
    });
  }, []);

  return { cursorPosition, username, setCursorPosition, setUsername };
};

export default useCursor;