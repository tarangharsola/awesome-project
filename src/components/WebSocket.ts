{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [retryCount, setRetryCount] = useState(0);
  const { send, close } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'connecting' && retryCount < 3) {
        setRetryCount(retryCount + 1);
        setConnectionStatus('retrying');
      } else if (connectionStatus === 'retrying' && retryCount >= 3) {
        setConnectionStatus('connected');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [connectionStatus, retryCount]);

  const handleConnectionStatus = (status) => {
    setConnectionStatus(status);
  };

  const handleRetry = () => {
    setRetryCount(0);
    setConnectionStatus('retrying');
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
};
export default WebSocket;