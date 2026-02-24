{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.on('open', () => {
      setConnected(true);
    });
    ws.on('close', () => {
      setConnected(false);
      setReconnecting(true);
    });
    ws.on('error', () => {
      setConnected(false);
      setReconnecting(true);
    });
  }, []);

  return { connected, reconnecting };
};

export default useReconnection;