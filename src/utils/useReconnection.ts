{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState(null);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setLastKnownState(webSocket.getLastKnownState());
    };

    webSocket.on('reconnect', handleReconnect);

    return () => {
      webSocket.off('reconnect', handleReconnect);
    };
  }, []);

  return reconnecting;
};

export default useReconnection;