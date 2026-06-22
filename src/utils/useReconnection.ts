{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      const newStatus = Math.random() < 0.5 ? 'connected' : 'disconnected';
      setConnectionStatus(newStatus);
      if (newStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retry = () => {
    setRetryCount(0);
    setConnectionStatus('connected');
  };

  return {
    retry,
    connectionStatus,
    retryCount
  };
};
export default useReconnection;