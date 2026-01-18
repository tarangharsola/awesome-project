{"import React, { useState, useEffect } from 'react';
import { useReconnection } from './useReconnection';

const ReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const { reconnect, retryCount } = useReconnection();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (retryCount > 0) {
        setConnectionStatus('reconnecting');
      } else {
        setConnectionStatus('connected');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [retryCount]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={reconnect}>Retry</button>
    </div>
  );
};

export default ReconnectionHandler;