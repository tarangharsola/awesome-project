{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface CursorProps {
  userId: string;
}

const useCursor = ({ userId }: CursorProps) => {
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [cursorColor, setCursorColor] = useState('#000000');
  const { send } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      send({ type: 'cursorPosition', data: { userId, cursorPosition } });
    }, 100);
    return () => clearInterval(intervalId);
  }, [userId, cursorPosition, send]);

  return { cursorPosition, cursorColor, setCursorPosition, setCursorColor };
};

export default useCursor;