{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const { reconnect, error: webSocketError } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    const handleReconnectSuccess = () => {
      setReconnecting(false);
      setError(null);
    };

    const handleReconnectError = (error) => {
      setError(error);
    };

    reconnect(handleReconnect, handleReconnectSuccess, handleReconnectError);

    return () => {
      reconnect.cancel();
    };
  }, [reconnect]);

  return reconnecting;
};

export default useReconnection;