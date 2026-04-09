{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('open', () => {
      setReconnecting(false);
    });
    ws.on('error', (error) => {
      setError(error);
      setReconnecting(true);
    });
    ws.on('close', () => {
      setReconnecting(true);
    });
  }, []);

  return {
    reconnecting,
    error,
  };
};

export default ReconnectionHandler;