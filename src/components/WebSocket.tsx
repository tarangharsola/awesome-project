{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  children: React.ReactNode;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WebSocketComponent: React.FC<Props> = ({ children, onConnect, onDisconnect }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onopen = () => {
      setWs(ws);
      onConnect();
    };

    ws.onclose = () => {
      setWs(null);
      onDisconnect();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [onConnect, onDisconnect]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!ws) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [ws, retryCount]);

  return (
    <div>
      {children}
      <p>Connection status: {ws ? 'Connected' : 'Disconnected'}</p>
      <p>Retry count: {retryCount}</p>
    </div>
  );
};

export default WebSocketComponent;