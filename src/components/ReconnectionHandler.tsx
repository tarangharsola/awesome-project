{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface ReconnectionHandlerProps {
  ws: WebSocket;
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ ws, onReconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ws.readyState || ws.readyState === WebSocket.CLOSED) {
        setReconnecting(true);
        onReconnect();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (reconnecting) {
    return <div>Reconnecting...</div);
  }
  return null;
};

export default ReconnectionHandler;