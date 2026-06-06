{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    setConnected(true);

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
      setConnected(false);
    });

    socket.on('write', (data) => {
      console.log('Received write event:', data);
    });

    socket.on('delete', (data) => {
      console.log('Received delete event:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, connected };
};
export default useWebSocket;