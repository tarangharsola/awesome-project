{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState({});
  const { reconnect } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setLastKnownState({});
    };

    reconnect(handleReconnect);

    return () => {
      reconnect.cancel(handleReconnect);
    };
  }, [reconnect]);

  return reconnecting;
};

export default useReconnection;