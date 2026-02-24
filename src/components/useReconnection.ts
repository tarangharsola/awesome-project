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

  const handleConnect = () => {
    setConnected(true);
    setRetryCount(0);
  }

  const handleDisconnect = () => {
    setConnected(false);
  }

  return {
    connected,
    retryCount,
    handleConnect,
    handleDisconnect
  };
};

export default useReconnection;