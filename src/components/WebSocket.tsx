{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetries(retries + 1);
        if (retries >= 3) {
          setConnectionStatus('reconnecting');
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retries]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retries: {retries}</p>
    </div>
  );
};
export default WebSocket;