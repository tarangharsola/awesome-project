{"import { useState, useEffect } from 'react';

interface ReconnectionHandlerProps {
  ws: WebSocket;
}

const useReconnectionHandler = ({ ws }: ReconnectionHandlerProps) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        setReconnected(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ws]);

  return { reconnecting, reconnected };
};

export default useReconnectionHandler;