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
    ws.onerror = () => {
      setConnected(false);
      setRetryCount(retryCount + 1);
    };
  }, []);

  const retryConnection = () => {
    if (retryCount < 5) {
      setTimeout(() => {
        setRetryCount(0);
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
          setConnected(true);
        };
        ws.onclose = () => {
          setConnected(false);
          setRetryCount(retryCount + 1);
        };
        ws.onerror = () => {
          setConnected(false);
          setRetryCount(retryCount + 1);
        };
      }, 5000);
    }
  };

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <button onClick={retryConnection}>Retry</button>
    </div>
  );
};

export default WebSocket;