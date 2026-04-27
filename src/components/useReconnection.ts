{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [reconnecting]);

  const handleConnectionStatus = (status) => {
    if (status === 'connected') {
      setReconnecting(false);
    } else if (status === 'disconnected') {
      setReconnecting(true);
    }
  };

  return {
    reconnecting,
    retryCount,
    handleConnectionStatus
  };
};

export default useReconnection;