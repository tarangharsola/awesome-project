{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface CursorProps {
  user: { id: string; name: string; color: string }
}

const useCursor = ({ user }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCursor({ x: Math.random() * 100, y: Math.random() * 100 });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return cursor;
}

export default useCursor;