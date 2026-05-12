{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        setConnectionStatus('reconnecting');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    setConnectionStatus('reconnecting');
  };

  return {
    retryCount,
    connectionStatus,
    handleRetry,
  };
};

export default useReconnection;