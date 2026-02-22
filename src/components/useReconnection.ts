{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const { reconnect } = useWebSocket();

  useEffect(() => {
    reconnect(() => setIsReconnecting(false));
  }, [reconnect]);

  return { isReconnecting, reconnect);
};

export default useReconnection;