{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const { send, close } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'Disconnected') {
        setRetryCount(retryCount + 1);
        send({ type: 'ping' });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount, send]);

  useEffect(() => {
    if (connectionStatus === 'Connected') {
      setRetryCount(0);
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (retryCount > 3) {
      close();
    }
  }, [retryCount, close]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default WebSocket;