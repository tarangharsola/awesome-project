{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  roomId: string;
}

const useWebSocket = (roomId: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${roomId}`);
    setWs(ws);
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    return () => ws.close();
  }, []);

  const sendCode = (code: string) => {
    if (ws) ws.send(code);
  };

  const receiveCode = (code: string) => {
    if (ws) ws.onmessage = (event) => console.log(event.data);
  };

  return { sendCode, receiveCode, connected };
};

export default useWebSocket;