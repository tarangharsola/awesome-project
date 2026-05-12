{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionOptions {
  webSocket: useWebSocket;
  onReconnect: () => void;
}

const useReconnection = ({ webSocket, onReconnect }: ReconnectionOptions) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      onReconnect();
    };

    webSocket.on('reconnect', handleReconnect);

    return () => {
      webSocket.off('reconnect', handleReconnect);
    };
  }, [webSocket, onReconnect]);

  return { reconnecting };
};

export default useReconnection;