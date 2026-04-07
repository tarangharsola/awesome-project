{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const ws = new WebSocket(wsUrl);
    setWs(ws);

    ws.onmessage = (event) => {
      // Handle incoming messages
    };

    ws.onclose = () => {
      setReconnecting(true);
    };

    ws.onerror = () => {
      setReconnecting(true);
    };

    return () => ws.close();
  }, []);

  const reconnect = () => {
    setReconnecting(false);
    setWs(null);
  };

  return { reconnecting, reconnect };
};

export default ReconnectionHandler;