{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const reconnect = () => {
      // Implement reconnection logic here
      setWs(new WebSocket('ws://localhost:8080'));
    };
    reconnect();
  }, []);

  return { reconnecting, ws };
};
export default useReconnection;