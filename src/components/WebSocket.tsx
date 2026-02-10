{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  onMessage: (message: string) => void;
}

const WebSocketComponent: React.FC<Props> = ({ onMessage }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        onMessage(event.data);
      };
    }
  }, [ws, onMessage]);

  return null;
}

export default WebSocketComponent;