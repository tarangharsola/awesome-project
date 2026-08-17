{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'react-use-websocket';

const useWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);
  const [backoffDelay, setBackoffDelay] = useState(1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'disconnected') {
        setRetryCount(retryCount + 1);
        setBackoffDelay(backoffDelay * 2);
        setConnectionStatus('retrying');
      }
    }, backoffDelay);
    return () => clearInterval(intervalId);
  }, [connectionStatus, retryCount, backoffDelay]);

  return {
    connectionStatus,
    retryCount,
    backoffDelay,
    setConnectionStatus,
    setRetryCount,
    setBackoffDelay
  };
};

export default useWebSocket;