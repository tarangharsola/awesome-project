{"import React from 'react';
import { useState, useEffect } from 'react';

interface WebSocketProps {
  url: string;
}

const WebSocket = ({ url }: WebSocketProps) => {
  const [ws, setWs] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(url);
    setWs(ws);
    return () => {
      ws.close();
    };
  }, [url]);
  return <div>WebSocket: {ws ? 'connected' : 'disconnected'}</div);
};

export default WebSocket;