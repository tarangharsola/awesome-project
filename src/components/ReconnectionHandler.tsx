{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io();
    setSocket(socket);
    socket.on('reconnect', () => {
      onReconnect();
      setReconnecting(false);
    });
    socket.on('disconnect', () => {
      setReconnecting(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  if (reconnecting) {
    return <div>Reconnecting...</div);
  }
  return null;
};

export default ReconnectionHandler;