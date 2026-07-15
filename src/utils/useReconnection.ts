{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState(null);
  const { reconnect, lastKnownState: wsLastKnownState } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setLastKnownState(wsLastKnownState);
    };

    reconnect(handleReconnect);

    return () => {
      reconnect(null);
    };
  }, []);

  return reconnecting;
};

export default useReconnection;