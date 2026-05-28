{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onclose = () => {
      setConnected(false);
      setRetryCount(retryCount + 1);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    return () => {
      ws.close();
    };
  }, []);

  const reconnect = () => {
    if (retryCount < 5) {
      setTimeout(() => {
        setRetryCount(0);
      }, 5000);
    }
  };

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <button onClick={reconnect}>Reconnect</button>
    </div>
  );
};
export default WebSocket;