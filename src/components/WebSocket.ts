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

    const interval = setInterval(() => {
      if (!connected && retries < 5) {
        ws.reconnect();
        setRetries(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      {retries > 0 && ` (retrying in ${5000 * retries}ms)`}
    </div>
  );
};
export default WebSocket;