{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const ws = new WebSocket(wsUrl, wsOptions);
    setWs(ws);

    ws.on('open', () => {
      console.log('Connected to WebSocket server.');
    });

    ws.on('close', () => {
      console.log('Disconnected from WebSocket server.');
      setReconnecting(true);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      ws.close();
    };
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;