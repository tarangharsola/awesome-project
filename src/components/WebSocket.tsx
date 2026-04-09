{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface WebSocketProps {
  children: React.ReactNode;
}

const WebSocket = ({ children }: WebSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
  }, []);

  return children;
}

export default WebSocket;