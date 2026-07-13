{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, reconnecting } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
    };

    reconnecting.on('reconnect', handleReconnect);

    return () => {
      reconnecting.off('reconnect', handleReconnect);
    };
  }, []);

  return reconnecting;
};

export default useReconnection;