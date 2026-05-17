{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = (error) => console.error(error);
    setWs(ws);
    return () => ws.close();
  }, [url]);

  return [ws, connected];
};

export default useWebSocket;