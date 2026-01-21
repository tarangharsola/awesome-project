{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface ReconnectionHandlerProps {
  ws: WebSocket;
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ ws, onReconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!ws.readyState || ws.readyState === WebSocket.CLOSED) {
        setReconnecting(true);
        onReconnect();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [ws, onReconnect]);

  return null;
};

export default ReconnectionHandler;