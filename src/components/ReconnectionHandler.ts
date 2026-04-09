{"import React from 'react';
import { useState, useEffect } from 'react';

const ReconnectionHandler = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      setConnected(Math.random() < 0.5);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
  };

  return (
    <div>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={handleRetry}>Retry ({retryCount})</button>
    </div>
  );
};
export default ReconnectionHandler;