{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../useWebSocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionError } = useWebSocket();

  useEffect(() => {
    if (connectionError) {
      setConnectionStatus('disconnected');
      setRetryCount(retryCount + 1);
      reconnect();
    } else {
      setConnectionStatus('connected');
    }
  }, [connectionError, reconnect, retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    reconnect();
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
};

export default ReconnectionHandler;