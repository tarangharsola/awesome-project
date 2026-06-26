{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
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
    });
  }, []);

  return { reconnecting, ws };
};

export default useReconnection;