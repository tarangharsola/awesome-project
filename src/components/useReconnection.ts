{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { ws } = useWebSocket();

  useEffect(() => {
    const handleConnectionLost = () => {
      setReconnecting(true);
    };

    ws.on('close', handleConnectionLost);
    return () => ws.off('close', handleConnectionLost);
  }, [ws]);

  return reconnecting;
};

export default useReconnection;