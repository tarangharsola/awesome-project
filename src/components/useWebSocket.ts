{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface WebSocketContext {
  sendText: (text: string) => void;
}

const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  const sendText = (text: string) => {
    if (ws) {
      ws.send(text);
    }
  };

  return {
    sendText,
  };
}

export default useWebSocket;