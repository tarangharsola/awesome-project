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

    return () => {
      webSocket.off('reconnect', handleReconnect);
    };
  }, [webSocket]);

  useEffect(() => {
    const handleStateChange = (state) => {
      setLastKnownState(state);
    };

    webSocket.on('stateChange', handleStateChange);

    return () => {
      webSocket.off('stateChange', handleStateChange);
    };
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;