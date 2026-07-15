{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [reconnect, setReconnect] = useState(() => () => {});

  useEffect(() => {
    const interval = setInterval(() => {
      if (retryCount > 0) {
        setRetryCount(retryCount - 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [retryCount]);

  const handleReconnect = () => {
    setRetryCount(0);
    setReconnect(() => () => {
      // implement reconnect logic here
    });
  };

  return {
    retryCount,
    reconnect: handleReconnect,
  };
};

export default useReconnection;