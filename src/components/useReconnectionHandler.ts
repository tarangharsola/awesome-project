{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState({});
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
  }, [webSocket]);

  return reconnecting;
};

export default useReconnectionHandler;