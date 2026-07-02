{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      console.log(event.data);
    };
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
      setRetryCount(retryCount + 1);
    };
    ws.onerror = (event) => {
      console.error(event);
    };
    return () => {
      ws.close();
    };
  }, []);

  const retry = () => {
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount(retryCount + 1);
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