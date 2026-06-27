{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    setConnectionStatus('Connected');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnectionStatus('Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const send = (message) => {
    socket.emit('message', message);
  };

  const close = () => {
    socket.disconnect();
  };

  const reconnect = () => {
    setRetryCount(0);
    setConnectionStatus('Connecting...');
    socket.connect();
  };

  return { send, close, reconnect };
};

export default useWebSocket;