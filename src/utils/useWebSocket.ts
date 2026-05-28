import { useState, useEffect } from 'react';

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = new WebSocket(url);
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);
  return socket;
}