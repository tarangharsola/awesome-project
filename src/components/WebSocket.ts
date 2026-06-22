{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status updates
      const newStatus = Math.random() < 0.5 ? 'connected' : 'disconnected';
      setConnectionStatus(newStatus);
      if (newStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retry = () => {
    setRetryCount(0);
    setConnectionStatus('connected');
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
};
export default WebSocket;