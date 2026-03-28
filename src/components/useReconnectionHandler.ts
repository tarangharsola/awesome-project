{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, reconnecting } = useWebSocket();

  React.useEffect(() => {
    const handleReconnect = () => {
      reconnect();
    };

    reconnecting && handleReconnect();

    return () => {
      // No-op
    };
  }, [reconnecting]);

  return reconnect;
};

export default useReconnectionHandler;