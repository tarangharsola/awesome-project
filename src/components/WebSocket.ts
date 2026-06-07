{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const { socket, connected } = useWebSocket();

  useEffect(() => {
    if (connected) {
      socket.on('write', (data) => {
        console.log(data);
      });
    }
  }, [connected, socket]);

  return <div>WebSocket</div>;
};

export default WebSocket;