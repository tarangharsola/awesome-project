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
      ws.onmessage = (event) => {
        console.log(event.data);
      };
      ws.onclose = () => {
        setReconnecting(false);
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