{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState<any>({});
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      webSocket.reconnect();
    };

    webSocket.on('reconnect', handleReconnect);

    return () => {
      webSocket.off('reconnect', handleReconnect);
    };
  }, [webSocket]);

  const reconnect = () => {
    setLastKnownState(webSocket.getState());
    webSocket.reconnect();
  };

  return { reconnect, reconnecting, lastKnownState };
};

export default useReconnection;