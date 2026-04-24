{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocketComponent = () => {
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
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retries]);

  const { connection, error } = useWebSocket();

  if (error) {
    setConnectionStatus('disconnected');
  }

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retries: {retries}</p>
    </div>
  );
};

export default WebSocketComponent;