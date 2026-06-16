{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      setConnectionStatus(Math.random() < 0.5 ? 'Connected' : 'Disconnected');
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleRetry}>Retry ({retryCount})</button>
    </div>
  );
};
export default WebSocket;