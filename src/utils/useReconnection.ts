{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = () => {
  const { send, reconnect } = useWebSocket();
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      send({ type: 'RECONNECT' });
    };

    send({ type: 'RECONNECT', payload: handleReconnect });
  }, []);

  const reconnect = () => {
    setReconnecting(false);
    send({ type: 'RECONNECT' });
  };

  return { reconnect, reconnecting };
};

export default useReconnection;