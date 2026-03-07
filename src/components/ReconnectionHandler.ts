{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setReconnecting(true);
        setRetryCount(retryCount + 1);
        reconnect();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, reconnect, retryCount]);

  return (
    <div>
      {reconnecting ? (
        <div>Reconnecting... ({retryCount} retries)</div>
      ) : (
        <div>Connected</div>
      )}
    </div>
  );
};
export default ReconnectionHandler;