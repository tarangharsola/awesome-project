{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const reconnect = () => {
      setReconnecting(true);
      const newWs = new WebSocket(wsUrl, wsOptions);
      newWs.on('open', () => {
        setWs(newWs);
        setReconnecting(false);
      });
      newWs.on('error', () => {
        setTimeout(reconnect, 1000);
      });
    };

    reconnect();
    return () => {
      ws && ws.close();
    };
  }, []);

  return { reconnecting, ws };
};

export default ReconnectionHandler;