{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  webSocket: useWebSocket;
}

const useReconnectionHandler = ({ webSocket }: ReconnectionHandlerProps) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnectCount, setReconnectCount] = useState(0);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      setReconnectCount((prevCount) => prevCount + 1);
    };

    webSocket.on('reconnect', handleReconnect);

    return () => webSocket.off('reconnect', handleReconnect);
  }, [webSocket]);

  useEffect(() => {
    if (reconnecting && reconnectCount > 0) {
      // implement reconnection logic here
    }
  }, [reconnecting, reconnectCount]);

  return { reconnecting, reconnectCount };
};

export default useReconnectionHandler;