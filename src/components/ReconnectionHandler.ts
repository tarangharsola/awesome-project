{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.onmessage = (event) => {
      console.log(event.data);
    };

    ws.onclose = () => {
      setReconnecting(true);
    };

    ws.onerror = (event) => {
      console.error(event);
    };

    return () => {
      ws.close();
    };
  }, []);

  const reconnect = () => {
    setReconnecting(false);
    setWs(new WebSocket('ws://localhost:8080'));
  };

  return { reconnecting, ws, reconnect };
};

export default ReconnectionHandler;