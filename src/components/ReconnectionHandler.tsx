{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('reconnect', () => {
        onReconnect();
      });
    }
  }, [socket]);
  return null;
};

export default ReconnectionHandler;