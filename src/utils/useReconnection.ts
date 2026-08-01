{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastError, setLastError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      setReconnecting(false);
      setLastError(null);
    };

    ws.onclose = () => {
      setReconnecting(true);
    };

    ws.onerror = (error) => {
      setLastError(error);
    };

    return () => {
      // Clean up
    };
  }, []);

  return {
    reconnecting,
    lastError
  };
};

export default useReconnection;