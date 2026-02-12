{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, reconnecting } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        setConnectionStatus('reconnecting');
      } else if (connectionStatus === 'reconnecting' && reconnecting === false) {
        setConnectionStatus('connected');
        setRetryCount(0);
      } else if (connectionStatus === 'connected' && reconnecting === true) {
        setRetryCount(retryCount + 1);
        if (retryCount >= 3) {
          setConnectionStatus('disconnected');
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [reconnecting, connectionStatus, reconnect]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};
export default ReconnectionHandler;