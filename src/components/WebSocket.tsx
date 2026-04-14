{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const WebSocket = ({ children }: Props) => {
  const [connected, setConnected] = useState(false);
  const [retries, setRetries] = useState(0);
  const [retryTimeout, setRetryTimeout] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnected(true);
      setRetries(0);
    };
    ws.onclose = () => {
      setConnected(false);
      setRetries(retries + 1);
      if (retries < 3) {
        setRetryTimeout(setTimeout(() => {
          ws.reconnect();
        }, 5000));
      }
    };
    ws.onerror = () => {
      setConnected(false);
    };
    return () => {
      ws.close();
      clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <div>
      {children}
      <p>Connected: {connected ? 'Yes' : 'No'}</p>
      <p>Retries: {retries}</p>
    </div>
  );
};

export default WebSocket;