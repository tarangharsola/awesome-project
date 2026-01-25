{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
  }, []);

  return socket;
};

export default WebSocket;