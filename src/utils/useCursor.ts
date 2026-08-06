{"import { useState, useEffect } from 'react';

const useCursor = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, color: '' });
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive((message) => {
      setCursor(message.cursor);
    });
  }, []);

  return cursor;
};

export default useCursor;