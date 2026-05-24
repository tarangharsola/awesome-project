{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const WebSocket = ({ children }: Props) => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setRetryCount(retryCount + 1);
    ws.onmessage = (event) => {
      if (event.data === 'reconnect') {
        setRetryCount(0);
      }
    };
    return () => ws.close();
  }, []);

  const reconnect = () => {
    setRetryCount(0);
  };

  return (
    <div>
      {children}
      <button onClick={reconnect}>Reconnect</button>
      <p>Connected: {connected.toString()}</p>
      <p>Retry count: {retryCount}</p>
    </div>
  );
};

export default WebSocket;