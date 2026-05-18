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

    return () => webSocket.off('reconnect', handleReconnect);
  }, []);

  useEffect(() => {
    const handleReconnectionError = (error) => {
      setError(error);
    };

    webSocket.on('reconnectionError', handleReconnectionError);

    return () => webSocket.off('reconnectionError', handleReconnectionError);
  }, []);

  return reconnecting;
};

export default useReconnection;