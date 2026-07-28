{"import React, { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

const useWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      setConnectionStatus('connected');
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      setRetryCount(retryCount + 1);
      setTimeout(() => {
        ws.reconnect();
      }, 5000);
    };

    ws.onerror = () => {
      setConnectionStatus('error');
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    connectionStatus,
    retryCount,
    reconnect: () => {
      ws.reconnect();
    }
  };
};
export default useWebSocket;