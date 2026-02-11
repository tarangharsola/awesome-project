{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ children }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const reconnect = () => {
      setReconnecting(true);
      const ws = new WebSocket('ws://localhost:8080');
      setWs(ws);
      ws.onmessage = (event) => {
        console.log(event.data);
      };
      ws.onclose = () => {
        setReconnecting(false);
        setTimeout(reconnect, 1000);
      };
    };
    reconnect();
    return () => {
      ws?.close();
    };
  }, []);

  return (
    <div>
      {children}
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
};

export default ReconnectionHandler;