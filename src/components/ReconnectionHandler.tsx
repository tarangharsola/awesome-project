{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  ws: useWebSocket;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ ws }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        clearInterval(intervalId);
        setReconnecting(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ws.readyState]);

  if (reconnecting) return <div>Reconnecting...</div>;

  return null;
};

export default ReconnectionHandler;