{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useCursor = () => {
  const { socket, connected } = useWebSocket();

  useEffect(() => {
    if (connected) {
      socket.on('cursor', (data) => {
        console.log(data);
      });
    }
  }, [connected, socket]);

  return <div>Cursor</div>;
};

export default useCursor;