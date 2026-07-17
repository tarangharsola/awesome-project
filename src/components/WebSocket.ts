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
      setTimeout(() => {
        ws.reconnect();
      }, 5000);
    };
    ws.onerror = () => {
      setConnected(false);
      setRetries(retries + 1);
      setTimeout(() => {
        ws.reconnect();
      }, 5000);
    };
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <br />
      {retries > 0 ? `Retries: ${retries}` : ''}
    </div>
  );
};
export default WebSocket;