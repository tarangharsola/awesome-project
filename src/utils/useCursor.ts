{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useCursor = ({ userId }) => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorColor, setCursorColor] = useState('#000000');
  const { send } = useWebSocket();

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      send({ type: 'cursor', data: { userId, cursorPosition } });
    }, 100);
    return () => clearInterval(cursorInterval);
  }, [userId, cursorPosition, send]);

  return { cursorPosition, cursorColor, setCursorPosition, setCursorColor };
}

export default useCursor;