{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      const newStatus = Math.random() < 0.5 ? 'Connected' : 'Disconnected';
      setConnectionStatus(newStatus);
      if (newStatus === 'Disconnected') {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retry = () => {
    setRetryCount(0);
  };

  return {
    connectionStatus,
    retryCount,
    retry
  };
};
export default useReconnection;