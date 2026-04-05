{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus: wsStatus } = useWebSocket();

  useEffect(() => {
    if (wsStatus === 'disconnected') {
      setConnectionStatus('disconnected');
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        reconnect();
      }, 5000);
    } else {
      setConnectionStatus('connected');
      setRetryCount(0);
    }
  }, [wsStatus, reconnect, retryCount]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default ReconnectionHandler;