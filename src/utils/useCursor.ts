{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string;
}

const useCursor = (userId: string) => {
  const [cursor, setCursor] = useState({
    userId,
    position: 0,
  });
  const { send } = useWebSocket();

  useEffect(() => {
    send({
      type: 'UPDATE_CURSOR',
      data: {
        userId,
        position: cursor.position,
      },
    });
  }, [cursor.position, send, userId]);

  return { cursor, setCursor };
}

export default useCursor;