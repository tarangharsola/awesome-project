{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRetryCount(retryCount + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const retry = () => {
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, 1000);
    }
  };

  return { retry };
};
export default useReconnection;