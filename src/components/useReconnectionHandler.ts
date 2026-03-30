{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, reconnectionError } = useWebSocket();
  const handleReconnection = () => {
    reconnect();
  };
  return { handleReconnection, reconnectionError };
};

export default useReconnectionHandler;