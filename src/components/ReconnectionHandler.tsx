{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [socket, setSocket] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on('disconnect', () => {
      setReconnecting(true);
    });

    socket.on('reconnect', () => {
      setReconnecting(false);
      onReconnect();
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