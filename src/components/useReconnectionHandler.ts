{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, reconnecting } = useWebSocket();

  React.useEffect(() => {
    const handleReconnect = () => {
      console.log('Reconnecting...');
      reconnect();
    };

    reconnecting.subscribe(handleReconnect);
    return () => {
      reconnecting.unsubscribe(handleReconnect);
    };
  }, [reconnecting, reconnect]);

  return {
    reconnecting,
    reconnect
  };
};

export default useReconnectionHandler;