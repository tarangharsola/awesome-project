{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketComponent = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [retries, setRetries] = useState(0);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onopen = () => {
      setConnectionStatus('Connected');
      setWs(ws);
    };

    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      setRetries(retries + 1);
      setTimeout(() => {
        setRetries(0);
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const retryConnection = () => {
    if (retries < 5) {
      setRetries(retries + 1);
      setTimeout(() => {
        setRetries(0);
      }, 5000);
    }
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={retryConnection}>Retry Connection</button>
    </div>
  );
};

export default WebSocketComponent;