{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function ReconnectionHandler({ children }) {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, reconnecting: isReconnecting } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isReconnecting) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isReconnecting, reconnect]);

  const handleReconnect = () => {
    reconnect();
    setRetryCount(0);
  };

  return (
    <div>
      {children}
      {isReconnecting ? (
        <div>
          Reconnecting... ({retryCount} retries)
        </div>
      ) : (
        <div>
          Connected
        </div>
      )}
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
}

export default ReconnectionHandler;