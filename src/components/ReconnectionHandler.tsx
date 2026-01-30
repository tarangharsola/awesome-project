{"import React, { useState, useEffect } from 'react';
import { WebSocket } from './WebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      console.log(event.data);
    };
    ws.onclose = () => {
      setReconnecting(true);
    };
    return () => {
      ws.close();
    };
  }, []);

  if (reconnecting) {
    return <div>Reconnecting...</div);
  }

  return children;
};

export default ReconnectionHandler;