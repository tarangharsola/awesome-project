{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      const newStatus = Math.random() < 0.5 ? 'Connected' : 'Disconnected';
      setConnectionStatus(newStatus);
      if (newStatus === 'Disconnected') {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retry = () => {
    setRetryCount(0);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retry}>Retry ({retryCount})</button>
    </div>
  );
};
export default WebSocket;