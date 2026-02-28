{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const { reconnect, isReconnecting } = useWebSocket();
  return { reconnect, isReconnecting };
};

export default useReconnectionHandler;