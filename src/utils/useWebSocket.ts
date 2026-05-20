{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    setConnected(true);
    return () => {
      socket.disconnect();
      setConnected(false);
    };
  }, []);

  return { socket, connected };
};

export default useWebSocket;