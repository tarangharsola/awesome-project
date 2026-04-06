{"import React, { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onReconnect: () => void;
}

const WebSocket: React.FC<Props> = ({ children, onReconnect }) => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
      onReconnect();
    };
    ws.onerror = () => {
      setConnected(false);
      onReconnect();
    };
    return () => ws.close();
  }, [onReconnect]);

  return (
    <div>
      {children}
      {connected ? (
        <div>
          Connected
        </div>
      ) : (
        <div>
          Disconnected
        </div>
      )}
    </div>
  );
};

export default WebSocket;