{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      // Handle incoming messages
    };

    ws.onopen = () => {
      setReconnected(true);
    };

    ws.onclose = () => {
      setReconnecting(true);
    };

    return () => {
      // Clean up
    };
  }, []);

  return {
    reconnecting,
    reconnected
  };
};
export default useReconnectionHandler;