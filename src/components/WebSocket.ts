{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status changes
      setConnectionStatus(Math.random() < 0.5 ? 'connected' : 'disconnected');
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const retry = () => {
    setRetries(retries + 1);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retry}>Retry ({retries})</button>
    </div>
  );
};
export default WebSocket;