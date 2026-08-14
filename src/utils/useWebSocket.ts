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
    return () => ws.close();
  }, [url]);

  const send = (data: any) => {
    if (ws) ws.send(JSON.stringify(data));
  };

  const receive = (data: any) => {
    if (ws) return JSON.parse(ws.onmessage(data));
  };

  return { send, receive };
}

export default useWebSocket;