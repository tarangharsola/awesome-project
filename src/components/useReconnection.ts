{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  const retryConnection = () => {
    // Implement retry logic here
  };

  return {
    connected,
    retryCount,
    retryConnection
  };
};

export default useReconnection;