{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setError(null);
    };

    const handleReconnectError = (error) => {
      setReconnecting(false);
      setError(error);
    };

    webSocket.on('reconnect', handleReconnect);
    webSocket.on('reconnectError', handleReconnectError);

    return () => {
      webSocket.off('reconnect', handleReconnect);
      webSocket.off('reconnectError', handleReconnectError);
    };
  }, [webSocket]);

  return { reconnecting, error };
};

export default useReconnectionHandler;