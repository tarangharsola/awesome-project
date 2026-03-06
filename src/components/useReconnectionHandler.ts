{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnectionHandler = () => {
  const [ws, setWs] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      // ws options
    };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onmessage = (event) => {
      // Handle incoming messages
    };

    ws.onopen = () => {
      setWs(ws);
      setReconnecting(false);
    };

    ws.onerror = (event) => {
      // Handle errors
    };

    ws.onclose = () => {
      setWs(null);
      setReconnecting(true);
    };

    return () => {
      // Clean up
    };
  }, []);

  const reconnect = () => {
    // Reconnect logic
  };

  return { reconnect, ws, reconnecting };
};

export default useReconnectionHandler;