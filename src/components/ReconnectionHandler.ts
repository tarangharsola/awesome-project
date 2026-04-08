{"import { useEffect, useState } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, isReconnecting } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setRetryCount((prevCount) => prevCount + 1);
    };

    reconnect(handleReconnect);

    return () => reconnect(null);
  }, [reconnect]);

  return {
    reconnecting,
    retryCount,
  };
};

export default ReconnectionHandler;