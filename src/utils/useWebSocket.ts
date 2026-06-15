{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  onMessage: (message: string) => void;
}

const useWebSocket = ({ onMessage }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        onMessage(event.data);
      };
    }
  }, [ws, onMessage]);

  return {
    ws,
    sendCode: (code: string) => {
      if (ws) {
        ws.send(code);
      }
    },
    sendCursor: (cursor: { x: number; y: number; user: string }) => {
      if (ws) {
        ws.send(JSON.stringify(cursor));
      }
    },
    sendLanguage: (language: string) => {
      if (ws) {
        ws.send(language);
      }
    },
    users: [],
    addUser: (user: string) => {
      if (ws) {
        ws.send(JSON.stringify({ type: 'addUser', user }));
      }
    },
    removeUser: (user: string) => {
      if (ws) {
        ws.send(JSON.stringify({ type: 'removeUser', user }));
      }
    }
  };
};

export default useWebSocket;