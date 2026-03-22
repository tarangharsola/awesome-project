{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const { reconnect, error: webSocketError } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setError(null);
    };

    const handleError = (error) => {
      setError(error);
    };

    reconnect(handleReconnect, handleError);

    return () => reconnect(null, null);
  }, [reconnect]);

  return { reconnecting, error };
};

export default useReconnectionHandler;