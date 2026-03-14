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

    const handleError = (error) => {
      setError(error);
    };

    webSocket.on('reconnect', handleReconnect);
    webSocket.on('error', handleError);

    return () => {
      webSocket.off('reconnect', handleReconnect);
      webSocket.off('error', handleError);
    };
  }, []);

  return { reconnecting, error };
};

export default useReconnectionHandler;