{"import React from 'react';
import { useState, useEffect } from 'react';

const ReconnectionHandler = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status
      const isConnected = Math.random() > 0.5;
      setConnected(isConnected);
      if (!isConnected) {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRetry = () => {
    setRetryCount(0);
  };

  return (
    <div>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Retry Count: {retryCount}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
};
export default ReconnectionHandler;