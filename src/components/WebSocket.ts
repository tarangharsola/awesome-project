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

  useEffect(() => {
    if (!connected && retryCount < 5) {
      setTimeout(() => ws.reconnect(), 1000);
    }
  }, [connected, retryCount, ws]);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <button onClick={() => ws.reconnect()}>Retry</button>
    </div>
  );
};
export default WebSocket;