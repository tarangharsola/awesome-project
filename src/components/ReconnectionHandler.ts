{"import { useEffect, useState } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = { reconnect: true, retry: 30000 };
    const ws = new WebSocket(wsUrl, wsOptions);

    ws.on('open', () => setWs(ws));
    ws.on('close', () => setReconnecting(true));
    ws.on('error', (error) => console.error('WebSocket error:', error));
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;