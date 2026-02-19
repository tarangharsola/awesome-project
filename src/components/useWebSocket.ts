{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  language: string;
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

  const send = (data: any) => {
    if (ws) {
      ws.send(JSON.stringify(data));
    }
  };

  const receive = (callback: (data: any) => void) => {
    if (ws) {
      ws.onmessage = (event) => {
        callback(JSON.parse(event.data));
      };
    }
  };

  return { send, receive };
}

export default useWebSocket;