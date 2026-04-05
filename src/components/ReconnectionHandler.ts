{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const reconnect = () => {
      setReconnecting(true);
      const ws = new WebSocket('ws://localhost:8080');
      setWs(ws);
      ws.onopen = () => {
        setReconnecting(false);
      };
      ws.onclose = () => {
        reconnect();
      };
    };

    reconnect();
  }, []);

  return {
    reconnecting,
    ws
  };
};

export default ReconnectionHandler;