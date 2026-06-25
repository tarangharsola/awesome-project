{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [backoff, setBackoff] = useState(5000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (retryCount > 0) {
        setRetryCount(retryCount - 1);
        setBackoff(backoff * 2);
      }
    }, backoff);
    return () => clearInterval(intervalId);
  }, [retryCount, backoff]);

  return { retryCount, backoff };
};

export default useReconnection;