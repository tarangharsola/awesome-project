{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const webSocket = useWebSocket();
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    webSocket.onReconnect(() => {
      setReconnecting(true);
    });
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;