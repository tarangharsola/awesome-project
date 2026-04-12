{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnectionStatus('connected');
    ws.onclose = () => {
      setConnectionStatus('disconnected');
      setRetryCount(retryCount + 1);
      if (retryCount < 3) {
        setTimeout(() => ws.connect(), 500);
      }
    };
    ws.onerror = () => {
      setConnectionStatus('error');
    };
  }, []);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};
export default WebSocket;