{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useCursor = () => {
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('cursor', (cursor) => setCursor(cursor));
    return () => socket.disconnect();
  }, []);

  return cursor;
};

export default useCursor;