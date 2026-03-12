{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const { reconnect, connectionStatus: wsStatus } = useWebSocket();

  useEffect(() => {
    setConnectionStatus(wsStatus);
  }, [wsStatus]);

  return { reconnect, connectionStatus };
};

export default useReconnectionHandler;