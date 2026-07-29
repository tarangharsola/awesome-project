{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useCursor = (userId: string) => {
  const [cursor, setCursor] = useState({ id: userId, position: 0 });
  const { send } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      send({ type: 'cursor', data: { id: userId, position: cursor.position } });
    }, 100);
    return () => clearInterval(intervalId);
  }, [userId, cursor.position, send]);

  return { cursor };
}

export default useCursor;