{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, isReconnecting } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isReconnecting) {
        setConnectionStatus('reconnecting');
      } else if (!isReconnecting && connectionStatus === 'reconnecting') {
        setConnectionStatus('connected');
        setRetryCount(0);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isReconnecting, connectionStatus]);

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      reconnect();
      setRetryCount(retryCount + 1);
    }
  }, [connectionStatus, reconnect, retryCount]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default ReconnectionHandler;