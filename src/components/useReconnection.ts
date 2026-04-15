{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { reconnect } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      reconnect().then(() => setReconnecting(false));
    };

    window.addEventListener('beforeunload', handleReconnect);
    return () => window.removeEventListener('beforeunload', handleReconnect);
  }, []);

  return {
    reconnecting,
  };
};

export default useReconnection;