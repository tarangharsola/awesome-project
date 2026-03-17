{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setReconnecting(true);
        setRetryCount(retryCount + 1);
        reconnect();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [connectionStatus, reconnect, retryCount]);

  return reconnecting ? retryCount : null;
};
export default useReconnection;