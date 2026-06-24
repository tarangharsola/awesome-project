{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  onMessage: (message: string) => void;
}

const useWebSocket = ({ onMessage }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.onmessage = (event) => {
      onMessage(event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendChanges = (changes) => {
    if (ws) {
      ws.send(JSON.stringify(changes));
    }
  };

  return { sendChanges };
};

export default useWebSocket;