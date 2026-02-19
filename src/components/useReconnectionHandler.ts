{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.on('open', () => {
      console.log('Connected to WebSocket server');
    });

    ws.on('close', () => {
      setReconnecting(true);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }, []);

  return { reconnecting, ws };
};

export default useReconnectionHandler;