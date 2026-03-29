{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, isReconnecting } = useWebSocket();

  React.useEffect(() => {
    const handleReconnect = () => {
      reconnect();
    };
    window.addEventListener('beforeunload', handleReconnect);
    return () => window.removeEventListener('beforeunload', handleReconnect);
  }, []);

  return isReconnecting;
};

export default useReconnectionHandler;