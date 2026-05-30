{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [reconnectCount, setReconnectCount] = useState(0);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);
    return () => socket.close();
  }, []);

  const send = (message) => {
    socket.emit('message', message);
  };

  const close = () => {
    socket.close();
  };

  const reconnect = () => {
    setReconnectCount(reconnectCount + 1);
    socket.connect();
  };

  return { send, close, reconnect };
};
export default useWebSocket;