{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnectCount, setReconnectCount] = useState(0);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setReconnectCount(reconnectCount + 1);
    };
    webSocket.on('reconnect', handleReconnect);
    return () => webSocket.off('reconnect', handleReconnect);
  }, [webSocket]);

  return { reconnecting, reconnectCount };
};

export default useReconnection;