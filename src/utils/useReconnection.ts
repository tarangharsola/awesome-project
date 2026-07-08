{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setError(null);
    };

    webSocket.on('reconnect', handleReconnect);

    return () => webSocket.off('reconnect', handleReconnect);
  }, [webSocket]);

  return { reconnecting, error };
};

export default useReconnection;