{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { ws, reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        setReconnecting(true);
        setRetryCount(retryCount + 1);
        reconnect();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [ws, reconnect, retryCount]);

  return { reconnecting, retryCount };
};

export default useReconnection;