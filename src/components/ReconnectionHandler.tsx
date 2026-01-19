{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io('ws://localhost:3001');
    setSocket(newSocket);
    newSocket.on('reconnect', () => {
      onReconnect();
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return null;
};

export default ReconnectionHandler;