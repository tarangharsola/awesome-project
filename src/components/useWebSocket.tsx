{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setReconnecting(true);
    });

    socket.on('reconnect', () => {
      console.log('Reconnected to WebSocket server');
      setReconnecting(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    reconnect: () => {
      socket.connect();
    },
    reconnecting
  };
};
export default useWebSocket;