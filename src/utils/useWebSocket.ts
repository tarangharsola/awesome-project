{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
    return () => ws.close();
  }, []);
  return socket;
};

export default useWebSocket;