{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = (): Reconnection => {
  const [reconnecting, setReconnecting] = useState(false);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      webSocket.reconnect();
    };

    webSocket.on('reconnect', handleReconnect);

    return () => webSocket.off('reconnect', handleReconnect);
  }, [webSocket]);

  return { reconnect: () => setReconnecting(true) };
};

export default useReconnection;