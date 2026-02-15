{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface Props {
  onConnect: () => void;
  onDisconnect: () => void;
  onMessage: (message: any) => void;
}

const WebSocket: React.FC<Props> = ({ onConnect, onDisconnect, onMessage }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      onConnect();
    });

    newSocket.on('disconnect', () => {
      onDisconnect();
    });

    newSocket.on('message', (message) => {
      onMessage(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return null;
};

export default WebSocket;