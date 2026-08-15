{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('open', () => setConnected(true));
    ws.on('close', () => setReconnecting(true));
    ws.on('error', () => setReconnecting(true));
    return () => ws.close();
  }, []);

  return { reconnecting, connected };
};

export default useReconnection;