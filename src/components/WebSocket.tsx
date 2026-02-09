{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const socketUrl = 'ws://localhost:3001';
    const socketOptions = {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
    };

    const socket = io(socketUrl, socketOptions);
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('reconnect', () => {
        setRetryCount(retryCount + 1);
      });
    }
  }, [socket, retryCount]);

  return <div>WebSocket Component</div>;
};

export default WebSocket;