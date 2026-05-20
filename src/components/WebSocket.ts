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
    };
    ws.onerror = () => {
      setConnectionStatus('Error');
    };
  }, []);

  const retryConnection = () => {
    if (retryCount < 5) {
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        ws.reconnect();
      }, 1000);
    }
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retryConnection}>Retry Connection</button>
    </div>
  );
};
export default WebSocket;