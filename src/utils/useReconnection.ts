{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
      setReconnecting(true);
    };
    ws.onerror = () => {
      setConnected(false);
    };
  }, []);

  return { reconnecting, connected };
};

export default useReconnection;