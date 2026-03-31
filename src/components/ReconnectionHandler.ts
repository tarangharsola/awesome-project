{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setError(null);
    };

    const handleReconnectError = (error) => {
      setError(error);
    };

    webSocket.on('reconnect', handleReconnect);
    webSocket.on('reconnectError', handleReconnectError);

    return () => {
      webSocket.off('reconnect', handleReconnect);
      webSocket.off('reconnectError', handleReconnectError);
    };
  }, []);

  return {
    reconnecting,
    error,
  };
};

export default ReconnectionHandler;