{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  return { connected, retryCount, setConnected, setRetryCount };
};
export default useReconnection;