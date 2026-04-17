{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    webSocket.on('reconnect', handleReconnect);

    return () => {
      webSocket.off('reconnect', handleReconnect);
    };
  }, []);

  useEffect(() => {
    const handleReconnectError = (error) => {
      setError(error);
    };

    webSocket.on('reconnectError', handleReconnectError);

    return () => {
      webSocket.off('reconnectError', handleReconnectError);
    };
  }, []);

  return { reconnecting, error };
};

export default useReconnection;