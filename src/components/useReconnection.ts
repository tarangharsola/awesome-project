{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastError, setLastError] = useState(null);
  const { reconnect, error } = useWebSocket();

  useEffect(() => {
    if (error) {
      setLastError(error);
      setReconnecting(true);
    }
  }, [error]);

  useEffect(() => {
    if (reconnecting && !error) {
      reconnect();
      setReconnecting(false);
    }
  }, [reconnecting, error]);

  return { reconnecting, lastError };
};

export default useReconnection;