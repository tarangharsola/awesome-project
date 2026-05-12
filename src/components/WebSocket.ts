{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        setConnectionStatus('reconnecting');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount]);

  const { send, close } = useWebSocket();

  const handleConnectionStatusChange = (status) => {
    setConnectionStatus(status);
  };

  const handleRetry = () => {
    setRetryCount(0);
    setConnectionStatus('reconnecting');
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
};

export default WebSocket;