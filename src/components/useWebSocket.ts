{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        if (retryCount >= 3) {
          setConnectionStatus('reconnecting');
        }
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount]);

  const reconnect = () => {
    setConnectionStatus('reconnecting');
    setRetryCount(0);
  };

  return {
    connectionStatus,
    reconnect
  };
};

export default useWebSocket;