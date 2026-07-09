{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnected(true);
    ws.onclose = () => {
      setConnected(false);
      setRetries(retries + 1);
    };
    ws.onerror = () => {
      setConnected(false);
      setRetries(retries + 1);
    };
  }, []);

  const retry = () => {
    if (retries < 5) {
      setTimeout(() => {
        setRetries(0);
      }, 2000);
    }
  };

  return (
    <div>
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={retry}>Retry ({retries})</button>
    </div>
  );
};
export default WebSocket;