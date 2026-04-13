{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useCursor = () => {
  const [cursor, setCursor] = useState({});
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('cursor', (data) => setCursor(data));
  }, []);

  return { cursor, updateCursor: (cursor) => send('cursor', cursor) };
};

export default useCursor;