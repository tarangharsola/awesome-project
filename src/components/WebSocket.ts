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
      setTimeout(() => {
        setRetryCount(0);
      }, 5000);
    };
    ws.onerror = () => {
      setConnected(false);
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      {retryCount > 0 ? ` (retrying in ${retryCount * 5000}ms)` : ''}
    </div>
  );
};
export default WebSocket;