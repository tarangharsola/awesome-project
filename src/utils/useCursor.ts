{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useCursor = (userId: string) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { send, receive } = useWebSocket();

  useEffect(() => {
    const cursorUpdate = (data: { userId: string; cursorPosition: number }) => {
      if (data.userId === userId) {
        setCursor({ x: data.cursorPosition, y: 0 });
      }
    };
    receive('cursorUpdate', cursorUpdate);
    return () => {
      receive('cursorUpdate', null);
    };
  }, []);

  return { cursor, setCursor };
}

export default useCursor;