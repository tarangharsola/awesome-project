{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const { socket, connected } = useWebSocket();

  useEffect(() => {
    if (connected) {
      socket.on('message', (message) => {
        console.log(message);
      });
    }
  }, [connected, socket]);

  return <div>WebSocket</div>;
};

export default WebSocket;