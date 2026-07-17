{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState({});
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    webSocket.on('reconnect', handleReconnect);

    return () => webSocket.off('reconnect', handleReconnect);
  }, [webSocket]);

  useEffect(() => {
    const handleDisconnect = () => {
      setLastKnownState(webSocket.getState());
      setReconnecting(false);
    };

    webSocket.on('disconnect', handleDisconnect);

    return () => webSocket.off('disconnect', handleDisconnect);
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;