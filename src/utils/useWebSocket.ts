{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  documentId: string;
}

const useWebSocket = (documentId: Props['documentId']) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${documentId}`);
    setWs(ws);
    return () => ws.close();
  }, []);

  const send = (message: string) => {
    if (ws) {
      ws.send(message);
    }
  };

  const receive = (callback: (message: string) => void) => {
    if (ws) {
      ws.onmessage = (event) => callback(event.data);
    }
  };

  return { send, receive };
};

export default useWebSocket;