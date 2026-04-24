{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState({});
  const { reconnect, lastKnownState: currentLastKnownState } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setLastKnownState(currentLastKnownState);
    };

    reconnect(handleReconnect);

    return () => reconnect(null);
  }, [reconnect, currentLastKnownState]);

  return reconnecting;
};

export default useReconnection;