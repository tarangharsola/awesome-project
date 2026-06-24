{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [connection, setConnection] = useState(null);
  const [send, setSend] = useState(null);
  const [close, setClose] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setConnection(socket);
    setSend(socket.emit);
    setClose(socket.close);
    return () => socket.disconnect();
  }, []);

  return { connection, send, close };
};

export default useWebSocket;