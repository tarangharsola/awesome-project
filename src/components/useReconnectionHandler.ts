{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, reconnecting } = useWebSocket();

  React.useEffect(() => {
    if (reconnecting) {
      console.log('Reconnecting...');
    }
  }, [reconnecting]);

  return reconnect;
};

export default useReconnectionHandler;