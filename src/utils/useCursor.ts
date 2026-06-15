{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  user: string;
}

const useCursor = ({ user }: Props) => {
  const { sendCursor } = useWebSocket();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      sendCursor({ x: cursor.x, y: cursor.y, user });
    }, 100);
    return () => clearInterval(interval);
  }, [cursor, user]);

  return { cursor, setCursor };
};

export default useCursor;