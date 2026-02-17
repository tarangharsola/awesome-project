{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('reconnection', () => {
      setReconnecting(true);
      setTimeout(() => {
        setReconnecting(false);
      }, 1000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    socket,
    reconnecting,
  };
};
export default WebSocket;