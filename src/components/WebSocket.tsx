{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

interface Props {
  children: React.ReactNode;
  onConnected: () => void;
  onDisconnected: () => void;
}

const WebSocketComponent: React.FC<Props> = ({ children, onConnected, onDisconnected }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.onopen = () => {
      setConnected(true);
      onConnected();
    };

    ws.onclose = () => {
      setConnected(false);
      onDisconnected();
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, [onConnected, onDisconnected]);

  return (
    <div>
      {children}
      {connected ? (
        <p>Connected</p>
      ) : (
        <p>Disconnected</p>
      )}
    </div>
  );
};

export default WebSocketComponent;