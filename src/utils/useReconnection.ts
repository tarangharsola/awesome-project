{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { webSocket, reconnect } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    reconnect(handleReconnect);
  }, [reconnect]);

  return reconnecting;
};

export default useReconnection;