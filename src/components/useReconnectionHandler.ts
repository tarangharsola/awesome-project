{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, reconnecting } = useWebSocket();

  React.useEffect(() => {
    reconnect();
  }, []);

  return reconnecting;
};

export default useReconnectionHandler;