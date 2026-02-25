{"import { useState, useEffect } from 'react';

interface WebSocketProps {
  onMessage: (message: string) => void;
}

const useWebSocket = ({ onMessage }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      onMessage(event.data);
    };
    return () => socket.close();
  }, []);

  return connected;
}

export default useWebSocket;