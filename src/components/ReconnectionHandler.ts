{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false
    };

    const reconnect = () => {
      setReconnecting(true);
      const newWs = new WebSocket(wsUrl, wsOptions);
      newWs.onopen = () => {
        setWs(newWs);
        setReconnecting(false);
      };
      newWs.onclose = () => {
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