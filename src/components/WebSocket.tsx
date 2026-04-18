{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnectionStatus('connected');
    ws.onclose = () => {
      setConnectionStatus('disconnected');
      setRetries(retries + 1);
    };
    ws.onerror = () => {
      setConnectionStatus('error');
    };
  }, []);

  const retry = () => {
    setRetries(0);
    setConnectionStatus('connecting');
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retry}>Retry</button>
    </div>
  );
};
export default WebSocket;