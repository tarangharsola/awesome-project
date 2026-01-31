{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  onMessage: (message: string) => void;
}

const WebSocketComponent = ({ onMessage }: Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => onMessage(event.data);
    return () => {
      ws.close();
    };
  }, []);
  return null;
};

export default WebSocketComponent;