{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnectionStatus('Connected');
    };
    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      setRetries(retries + 1);
    };
    ws.onerror = () => {
      setConnectionStatus('Error');
    };
  }, []);

  const retry = () => {
    setRetries(0);
    ws.reconnect();
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
};
export default WebSocket;