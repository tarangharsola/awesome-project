{"import React from 'react';
import { useState, useEffect } from 'react';

const ReconnectionHandler = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      setConnected(Math.random() < 0.5);
      setRetryCount(Math.random() < 0.5 ? retryCount + 1 : 0);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retry = () => {
    // Simulate retry logic
    console.log('Retrying connection...');
    setRetryCount(retryCount + 1);
  };

  return (
    <div>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Retry Count: {retryCount}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
};
export default ReconnectionHandler;