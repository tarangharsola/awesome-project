{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, reconnecting } = useWebSocket();

  useEffect(() => {
    if (reconnecting) {
      const intervalId = setInterval(() => {
        setRetryCount(retryCount + 1);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [reconnecting, retryCount]);

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