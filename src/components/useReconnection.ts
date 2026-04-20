{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface ReconnectionProps {
  ws: WebSocket;
}

const useReconnection = (props: ReconnectionProps) => {
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const reconnectInterval = setInterval(() => {
      if (props.ws.readyState === WebSocket.OPEN) {
        setReconnected(true);
        clearInterval(reconnectInterval);
      }
    }, 1000);
    return () => clearInterval(reconnectInterval);
  }, [props.ws]);

  return { reconnected };
};

export default useReconnection;