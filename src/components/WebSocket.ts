{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const { send, close } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        send({ type: 'retry' });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount, send]);

  const handleConnectionStatusChange = (status) => {
    setConnectionStatus(status);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default WebSocket;