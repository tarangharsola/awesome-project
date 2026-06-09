{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
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

  useEffect(() => {
    if (reconnecting) {
      console.log('Reconnecting to WebSocket server');
      const socket = io('ws://localhost:3001');
      setSocket(socket);
    }
  }, [reconnecting]);

  return {
    socket,
    reconnecting
  };
};

export default WebSocket;