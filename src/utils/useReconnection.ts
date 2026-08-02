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

  useEffect(() => {
    const reconnect = () => {
      // implement reconnect logic here
    };
    setReconnect(reconnect);
  }, []);

  return [retryCount, reconnect];
};

export default useReconnection;