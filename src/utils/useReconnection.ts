{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status changes
      setConnected(Math.random() < 0.5);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retryConnection = () => {
    setRetryCount(retryCount + 1);
    // Simulate retry logic
    setTimeout(() => {
      setConnected(true);
    }, 2000);
  };

  return { retryConnection, connected, retryCount };
};
export default useReconnection;