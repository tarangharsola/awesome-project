{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface WebSocketProps {
  url: string;
}

const useWebSocket = ({ url }: WebSocketProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => ws.close();
  }, [url]);

  const send = (message: any) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  return { ws, messages, send };
};

export default useWebSocket;