{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  url: string;
}

const useWebSocket = ({ url }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([] as any[]);

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

  return { send, ws, messages };
}

export default useWebSocket;