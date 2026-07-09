{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Reconnection {
  reconnect: () => void;
}

const useReconnection = () => {
  const webSocket = useWebSocket();
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    if (webSocket) {
      webSocket.on('close', () => {
        setReconnecting(true);
      });
    }
  }, [webSocket]);

  const reconnect = () => {
    if (webSocket) {
      webSocket.reconnect();
    }
  };

  return { reconnecting, reconnect };
};

export default useReconnection;