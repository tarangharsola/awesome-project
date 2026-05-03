{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      webSocket.reconnect().catch((error) => {
        setError(error);
      }).finally(() => {
        setReconnecting(false);
      });
    };

    webSocket.on('reconnect', handleReconnect);

    return () => {
      webSocket.off('reconnect', handleReconnect);
    };
  }, [webSocket]);

  return { reconnecting, error, reconnect: webSocket.reconnect };
};

export default useReconnection;