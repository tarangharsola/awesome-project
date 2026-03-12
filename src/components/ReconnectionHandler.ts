{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setReconnecting(true);
    } else {
      setReconnecting(false);
    }
  }, [connectionStatus]);

  useEffect(() => {
    if (reconnecting) {
      const intervalId = setInterval(() => {
        reconnect();
        setRetryCount(retryCount + 1);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [reconnecting, reconnect, retryCount]);

  return (
    <div>
      {reconnecting ? (
        <p>Reconnecting...</p>
      ) : (
        <p>Connected</p>
      )}
    </div>
  );
};

export default ReconnectionHandler;