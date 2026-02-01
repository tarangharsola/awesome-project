{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const socketUrl = 'ws://localhost:3001';
    const socketOptions = {
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    };

    const newSocket = io(socketUrl, socketOptions);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleConnectionStatus = (status) => {
    console.log('Connection Status:', status);
  };

  return (
    <div>
      <p>Connection Status: {socket ? 'Connected' : 'Disconnected'}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};
export default WebSocket;