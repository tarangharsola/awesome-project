{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = () => {
  const { webSocket } = useWebSocket();
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (webSocket.readyState === WebSocket.OPEN) {
        clearInterval(intervalId);
        setReconnecting(false);
      } else if (webSocket.readyState === WebSocket.CLOSING || webSocket.readyState === WebSocket.CLOSED) {
        setReconnecting(true);
        webSocket.reconnect();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;