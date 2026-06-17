{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [reconnect, setReconnect] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnect) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [reconnect, retryCount]);

  const handleReconnect = () => {
    setReconnect(true);
  };

  return {
    reconnect: handleReconnect,
    retryCount,
  };
};
export default useReconnection;