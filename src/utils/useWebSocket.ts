{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useWebSocket;