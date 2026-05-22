{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('cursorUpdate', (data) => {
      setCursorPosition(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return cursorPosition;
};

export default useCursor;