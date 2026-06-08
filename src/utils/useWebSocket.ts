{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle incoming data
    };
    ws.onerror = (event) => {
      setError(event);
    };
    return () => ws.close();
  }, []);

  return [ws, error];
};

export default useWebSocket;