{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionError } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionError) {
        setConnectionStatus('disconnected');
        setRetryCount(retryCount + 1);
        reconnect();
      } else {
        setConnectionStatus('connected');
        setRetryCount(0);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionError, reconnect, retryCount]);

  return { connectionStatus, retryCount };
};
export default useReconnectionHandler;