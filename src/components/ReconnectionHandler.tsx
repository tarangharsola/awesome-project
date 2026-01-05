{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    socket.on('reconnect', () => {
      onReconnect();
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return null;
};

export default ReconnectionHandler;