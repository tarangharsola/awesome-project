{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
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
      setTimeout(() => {
        setReconnecting(false);
      }, 5000);
    });
  }, []);

  return {
    reconnecting,
    ws,
  };
};
export default ReconnectionHandler;