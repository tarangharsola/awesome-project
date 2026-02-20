{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const webSocket = useWebSocket();
  const reconnect = webSocket.reconnect;
  return reconnect;
};

export default useReconnectionHandler;