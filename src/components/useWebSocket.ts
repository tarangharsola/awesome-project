import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface useWebSocket {
  ws: WebSocket;
  onMessage: (message: string) => void;
  onClose: () => void;
}

const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [onMessage, setOnMessage] = useState<(message: string) => void>(() => () => {});
  const [onClose, setOnClose] = useState<() => void>(() => () => {});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      setOnMessage((prevOnMessage) => () => {
        prevOnMessage(event.data);
      });
    };

    ws.onclose = () => {
      setOnClose(() => () => {});
    };

    setWs(ws);

    return () => {
      ws.close();
    };
  }, []);

  return { ws, onMessage, onClose };
};

export default useWebSocket;