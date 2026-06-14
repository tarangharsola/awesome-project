{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnected(true);
    ws.onclose = () => {
      setConnected(false);
      setRetryCount(retryCount + 1);
    };
    ws.onerror = () => {
      setConnected(false);
      setRetryCount(retryCount + 1);
    };
    return () => ws.close();
  }, []);

  const retry = () => {
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount(0);
        ws.reconnect();
      }, 1000);
    }
  };

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <button onClick={retry}>Retry</button>
    </div>
  );
};
export default WebSocket;