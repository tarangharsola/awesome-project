{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface WebSocketProps {
  url: string;
}

const useWebSocket = ({ url }: WebSocketProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    setWs(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return ws;
}

export default useWebSocket;