{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState({});
  const { reconnect, lastKnownState: currentLastKnownState } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    reconnect(handleReconnect);

    return () => {
      reconnect(null);
    };
  }, []);

  useEffect(() => {
    setLastKnownState(currentLastKnownState);
  }, [currentLastKnownState]);

  return reconnecting;
};

export default useReconnection;