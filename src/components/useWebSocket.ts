{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    socket.on('connect', () => {
      setConnectionStatus('connected');
    });
    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });
    return () => {
      socket.close();
    };
  }, []);

  const send = (message) => {
    socket.emit('message', message);
  };

  const close = () => {
    socket.close();
  };

  return { send, close, connectionStatus };
};

export default useWebSocket;