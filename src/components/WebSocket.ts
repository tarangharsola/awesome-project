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
  }, []);

  const retry = () => {
    if (retryCount < 5) {
      setTimeout(() => {
        setRetryCount(0);
        setConnected(false);
      }, 1000);
    }
  };

  return (
    <div>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
};
export default WebSocket;