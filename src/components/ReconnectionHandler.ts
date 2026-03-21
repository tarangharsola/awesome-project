{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const [backoffTimeout, setBackoffTimeout] = useState(null);

  const { reconnect, connectionStatus: wsConnectionStatus } = useWebSocket();

  useEffect(() => {
    setConnectionStatus(wsConnectionStatus);
  }, [wsConnectionStatus]);

  const handleReconnect = () => {
    setRetryCount(retryCount + 1);
    setBackoffTimeout(setTimeout(reconnect, Math.pow(2, retryCount) * 1000));
  };

  useEffect(() => {
    if (!wsConnectionStatus) {
      handleReconnect();
    }
  }, [wsConnectionStatus, retryCount]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
};

export default ReconnectionHandler;