{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setReconnecting(true);
    } else {
      setReconnecting(false);
    }
  }, [connectionStatus]);

  const handleReconnect = () => {
    reconnect();
    setRetryCount(0);
  };

  return {
    reconnecting,
    retryCount,
    handleReconnect
  };
};
export default useReconnection;