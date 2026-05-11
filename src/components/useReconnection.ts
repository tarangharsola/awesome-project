{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { reconnect, connectionStatus } = useWebSocket();

  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      setReconnecting(true);
      setRetryCount(0);
    } else if (connectionStatus === 'reconnecting') {
      setReconnecting(true);
      setRetryCount(retryCount + 1);
    } else {
      setReconnecting(false);
    }
  }, [connectionStatus, reconnect, retryCount]);

  const handleReconnect = () => {
    reconnect();
    setRetryCount(0);
  };

  return {
    reconnecting,
    retryCount,
    handleReconnect
  };
};

export default useReconnection;