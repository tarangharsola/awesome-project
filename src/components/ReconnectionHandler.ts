{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.on('open', () => setReconnecting(false));
    ws.on('close', () => setReconnecting(true));
    ws.on('error', () => setReconnecting(true));
    return () => ws.destroy();
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;