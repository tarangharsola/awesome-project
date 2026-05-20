{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorColor, setCursorColor] = useState('#000000');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('cursorUpdate', (data) => {
      setCursorPosition(data);
      setCursorColor(data.color);
    });
  }, []);

  return { cursorPosition, cursorColor };
};

export default useCursor;