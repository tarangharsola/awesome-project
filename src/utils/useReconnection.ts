{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const { webSocket } = useWebSocket();

  useEffect(() => {
    const handleConnectionStateChange = (newState) => {
      if (newState === 'disconnected') {
        setReconnecting(true);
      } else {
        setReconnecting(false);
      }
    };

    webSocket.on('connectionStateChange', handleConnectionStateChange);

    return () => {
      webSocket.off('connectionStateChange', handleConnectionStateChange);
    };
  }, [webSocket]);

  return reconnecting;
};

export default useReconnection;