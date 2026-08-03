{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        setRetryCount(retryCount + 1);
        if (retryCount >= 3) {
          setReconnecting(false);
        }
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [reconnecting, retryCount]);

  return [retryCount, reconnecting, setReconnecting];
};

export default useReconnection;