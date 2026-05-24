{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useCursor = () => {
  const [cursor, setCursor] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    socket.on('cursor', (data) => {
      setCursor(data);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return { cursor, connected };
};

export default useCursor;