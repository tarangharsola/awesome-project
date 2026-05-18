{"import React from 'react';
import { useState, useEffect } from 'react';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      setConnectionStatus('Connected');
    };

    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      setRetryCount(retryCount + 1);
      if (retryCount < 3) {
        setTimeout(() => {
          ws.reconnect();
        }, 5000);
      }
    };

    ws.onerror = () => {
      setConnectionStatus('Error');
    };

    return () => {
      ws.close();
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