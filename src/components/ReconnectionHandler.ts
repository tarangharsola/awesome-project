{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = { reconnect: true, retry: 3000 };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onopen = () => {
      setWs(ws);
      setReconnecting(false);
    };

    ws.onclose = () => {
      setReconnecting(true);
    };

    ws.onerror = () => {
      setReconnecting(true);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;