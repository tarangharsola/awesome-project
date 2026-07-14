{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastError, setLastError] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setLastError(null);
    };

    webSocket.on('reconnect', handleReconnect);
    return () => webSocket.off('reconnect', handleReconnect);
  }, [webSocket]);

  useEffect(() => {
    const handleDisconnect = () => {
      setReconnecting(false);
      setLastError('Disconnected from server.');
    };

    webSocket.on('disconnect', handleDisconnect);
    return () => webSocket.off('disconnect', handleDisconnect);
  }, [webSocket]);

  return { reconnecting, lastError };
};

export default useReconnection;