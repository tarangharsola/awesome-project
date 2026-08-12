{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { webSocket } = useWebSocket();

  useEffect(() => {
    const handleConnectionStatus = (status) => {
      if (status === 'disconnected') {
        setReconnecting(true);
      } else {
        setReconnecting(false);
      }
    };

    webSocket.on('connectionStatus', handleConnectionStatus);
    return () => webSocket.off('connectionStatus', handleConnectionStatus);
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;