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
    const interval = setInterval(() => {
      if (!connected && retryCount < 5) {
        setRetryCount(retryCount + 1);
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
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [connected, retryCount]);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <br />
      Retry count: {retryCount}
    </div>
  );
};
export default WebSocket;