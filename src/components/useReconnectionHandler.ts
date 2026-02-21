{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    const handleReconnectError = (error) => {
      setError(error);
    };

    useWebSocket().on('reconnect', handleReconnect);
    useWebSocket().on('reconnectError', handleReconnectError);

    return () => {
      useWebSocket().off('reconnect', handleReconnect);
      useWebSocket().off('reconnectError', handleReconnectError);
    };
  }, []);

  return { reconnecting, error };
};

export default useReconnectionHandler;