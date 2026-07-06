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
      setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, 500);
    }
  }, [connected, retryCount]);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <button onClick={() => ws.send('ping')}>Ping</button>
    </div>
  );
};
export default WebSocket;