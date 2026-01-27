{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface useWebSocketProps {
  roomId: string;
}

const useWebSocket = ({ roomId }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    // implement WebSocket logic here
  }, []);
  return ws;
};

export default useWebSocket;