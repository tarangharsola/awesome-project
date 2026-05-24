{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    return () => socket.disconnect();
  }, []);

  return socket;
};

export default useWebSocket;