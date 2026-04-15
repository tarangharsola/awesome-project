{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = () => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWebSocket(ws);
  }, []);

  return webSocket;
};

export default useWebSocket;