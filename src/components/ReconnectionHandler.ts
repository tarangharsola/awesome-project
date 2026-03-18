{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, reconnectInterval } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        setRetryCount(retryCount + 1);
      }
    }, reconnectInterval);
    return () => clearInterval(intervalId);
  }, [reconnecting, reconnectInterval, retryCount]);

  const handleReconnect = () => {
    setReconnecting(true);
    reconnect();
  };

  return (
    <div>
      {reconnecting ? (
        <div>Reconnecting... ({retryCount} retries)</div>
      ) : (
        <div>Connected</div>
      )}
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
};
export default ReconnectionHandler;