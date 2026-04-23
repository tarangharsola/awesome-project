{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection loss and retry
      if (Math.random() < 0.5) {
        setConnectionStatus('disconnected');
        setRetryCount(retryCount + 1);
      } else {
        setConnectionStatus('connected');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};
export default WebSocket;