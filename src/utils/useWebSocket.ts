{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      console.log(event.data);
    };
    ws.onopen = () => {
      setConnected(true);
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