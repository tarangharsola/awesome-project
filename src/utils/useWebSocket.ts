{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  userId: string;
}

const useWebSocket = (userId: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  const send = (event: string, data: any) => {
    if (ws) {
      ws.send(JSON.stringify({ event, data }));
    }
  };

  const receive = (event: string, callback: (data: any) => void) => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === event) {
          callback(data.data);
        }
      };
    }
  };

  return { send, receive };
}

export default useWebSocket;