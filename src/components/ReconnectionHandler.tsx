{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);
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

  useEffect(() => {
    if (socket && socket.connected) {
      setReconnecting(false);
    } else {
      setReconnecting(true);
    }
  }, [socket]);

  if (reconnecting) {
    return <div>Reconnecting...</div);
  }
  return null;
};

export default ReconnectionHandler;