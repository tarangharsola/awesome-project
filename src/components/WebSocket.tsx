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
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        setRetryCount(0);
      }, 5000);
    };
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <button onClick={() => ws.send('ping')}>Ping</button>
    </div>
  );
};
export default WebSocket;