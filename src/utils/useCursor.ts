{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useCursor = () => {
  const { cursors, send } = useWebSocket();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPosition(cursors);
    }, 100);
    return () => clearInterval(interval);
  }, [cursors]);

  const handleMouseMove = (event) => {
    send({ type: 'cursor', payload: event.clientX, y: event.clientY });
  };

  return { cursorPosition, handleMouseMove };
};

export default useCursor;