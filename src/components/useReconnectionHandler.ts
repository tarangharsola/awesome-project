{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastError, setLastError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setLastError(null);
    };

    const handleDisconnect = () => {
      setReconnecting(false);
      setLastError('Disconnected from server.');
    };

    webSocket.on('reconnect', handleReconnect);
    webSocket.on('disconnect', handleDisconnect);

    return () => {
      webSocket.off('reconnect', handleReconnect);
      webSocket.off('disconnect', handleDisconnect);
    };
  }, [webSocket]);

  return { reconnecting, lastError };
};

export default useReconnectionHandler;