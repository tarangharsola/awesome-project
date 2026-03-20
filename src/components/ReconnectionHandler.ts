{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.on('open', () => {
      setReconnecting(false);
    });

    ws.on('close', () => {
      setReconnecting(true);
      setTimeout(() => {
        ws.reconnect();
      }, 1000);
    });

    ws.on('error', (error) => {
      console.error('Error:', error);
    });

    return () => ws.destroy();
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;