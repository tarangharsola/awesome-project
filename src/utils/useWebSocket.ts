{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'write') {
        // Handle write operation
      } else if (data.type === 'delete') {
        // Handle delete operation
      }
    };

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onerror = (event) => {
      console.error(event);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { ws, connected };
};

export default useWebSocket;