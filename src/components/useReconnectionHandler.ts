{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, connectionStatus } = useWebSocket();
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setReconnecting(true);
    } else {
      setReconnecting(false);
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (reconnecting) {
      const intervalId = setInterval(() => {
        reconnect();
        setRetryCount(retryCount + 1);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [reconnecting, reconnect, retryCount]);

  return reconnect;
};

export default useReconnectionHandler;