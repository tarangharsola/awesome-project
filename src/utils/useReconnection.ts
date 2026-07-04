{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [reconnectTimeout, setReconnectTimeout] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate reconnection logic
      setRetryCount(retryCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
  };

  return {
    retryCount,
    handleRetry,
    reconnectTimeout,
  };
};
export default useReconnection;