{"import { useState, useEffect } from 'react';

interface ReconnectionOptions {
  retryDelay: number;
  maxRetries: number;
}

const useReconnection = (options: ReconnectionOptions) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        setRetryCount(retryCount + 1);
      }
    }, options.retryDelay);

    return () => clearInterval(intervalId);
  }, [reconnecting, options.retryDelay]);

  const handleConnectionError = () => {
    setReconnecting(true);
 );

  const handleReconnect = () => {
    setReconnecting(false);
    setRetryCount(0);
  };

  return {
    reconnecting,
    retryCount,
    handleConnectionError,
    handleReconnect
  };
};

export default useReconnection;