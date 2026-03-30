{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    socket.on('connect', () => {
      setConnectionStatus('connected');
    });
    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });
  }, []);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
    </div>
  );
};
export default WebSocket;