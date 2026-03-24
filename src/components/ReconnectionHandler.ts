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
      reconnect();
    } else {
      setConnectionStatus('connected');
      setRetryCount(0);
    }
  }, [wsStatus, reconnect, retryCount]);

  const handleRetry = () => {
    reconnect();
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleRetry}>Retry ({retryCount})</button>
    </div>
  );
};

export default ReconnectionHandler;