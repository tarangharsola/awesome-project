{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      console.log(event.data);
    };

    ws.onopen = () => {
      setWs(ws);
    };

    ws.onclose = () => {
      setReconnecting(true);
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    reconnecting,
    ws,
  };
};

export default ReconnectionHandler;