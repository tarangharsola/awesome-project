{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const { reconnect, error: webSocketError } = useWebSocket();

  useEffect(() => {
    if (webSocketError) {
      setError(webSocketError);
    }
  }, [webSocketError]);

  const handleReconnect = () => {
    setReconnecting(true);
    reconnect().then(() => setReconnecting(false));
 );

  return {
    reconnecting,
    error,
    handleReconnect
  };
};

export default useReconnectionHandler;