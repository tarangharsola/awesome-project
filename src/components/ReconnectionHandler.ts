{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const reconnect = () => {
      setReconnecting(true);
      const ws = new WebSocket(wsUrl, wsOptions);
      ws.onopen = () => {
        setWs(ws);
        setReconnecting(false);
      };
      ws.onclose = () => {
        setWs(null);
        setReconnecting(true);
        setTimeout(reconnect, 1000);
      };
      ws.onerror = () => {
        setWs(null);
        setReconnecting(true);
        setTimeout(reconnect, 1000);
      };
    };

    reconnect();

    return () => {
      ws?.close();
    };
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;