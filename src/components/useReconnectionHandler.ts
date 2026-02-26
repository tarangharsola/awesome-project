{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, reconnectionError } = useWebSocket();

  React.useEffect(() => {
    reconnect();
  }, []);

  return reconnectionError;
};

export default useReconnectionHandler;