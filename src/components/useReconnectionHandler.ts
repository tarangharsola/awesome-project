{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        reconnect();
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connected, reconnect, retryCount]);

  useEffect(() => {
    setConnected(connectionStatus === 'connected');
  }, [connectionStatus]);

  return {
    connected,
    retryCount,
  };
}

export default useReconnectionHandler;