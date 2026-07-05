{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const WebSocket = ({ children }: Props) => {
  const [connected, setConnected] = useState(false);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setRetries(retries + 1);
    return () => ws.close();
  }, []);

  const retry = () => {
    setRetries(0);
    setConnected(false);
  };

  return (
    <div>
      {children}
      <button onClick={retry}>Retry ({retries})</button>
      <span style={{ color: connected ? 'green' : 'red' }}>{connected ? 'Connected' : 'Disconnected'}</span>
    </div>
  );
};
export default WebSocket;