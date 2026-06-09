{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  userId: string
}

const useCursor = ({ userId }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { connection } = useWebSocket();

  useEffect(() => {
    if (connection) {
      connection.onmessage = (event) => {
        const { x, y } = JSON.parse(event.data);
        setCursor({ x, y });
      };
    }
  }, [connection]);

  return { cursor, color: connection?.color };
}

export default useCursor;