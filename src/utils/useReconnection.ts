{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.on('open', () => {
      console.log('Connected to WebSocket server');
    });

    ws.on('error', (error) => {
      console.error('Error occurred while connecting to WebSocket server:', error);
      setReconnecting(true);
    });

    ws.on('close', () => {
      console.log('Disconnected from WebSocket server');
      setReconnecting(true);
    });

    return () => {
      ws.destroy();
    };
  }, []);

  return { reconnecting, ws };
};

export default useReconnection;