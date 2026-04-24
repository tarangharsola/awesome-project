{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [connection, setConnection] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setConnection(socket);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setError('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { connection, error };
};

export default useWebSocket;