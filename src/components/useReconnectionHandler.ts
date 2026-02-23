{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface ReconnectionHandler {
  reconnect: () => void;
}

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onclose = () => {
      setReconnecting(true);
    };
    ws.onopen = () => {
      setReconnecting(false);
    };
    return () => {
      ws.close();
    };
  }, []);

  const reconnect = () => {
    if (reconnecting) {
      // Reconnect to WebSocket server
    }
  };

  return {
    reconnect,
  };
}

export default useReconnectionHandler;