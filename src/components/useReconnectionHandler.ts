{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const reconnect = () => {
      setReconnecting(true);
      const ws = new WebSocket('ws://localhost:8080');
      setWs(ws);
      ws.on('open', () => {
        setReconnecting(false);
      });
      ws.on('error', () => {
        setTimeout(reconnect, 1000);
      });
    };

    reconnect();
  }, []);

  return { reconnecting, ws };
};

export default useReconnectionHandler;