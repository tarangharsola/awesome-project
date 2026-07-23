{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from 'use-websocket';

const useWebSocket = (url, options) => {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(url);
    let retryTimeout;

    ws.onopen = () => {
      setConnectionStatus('connected');
      clearTimeout(retryTimeout);
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      setRetryCount(retryCount + 1);
      retryTimeout = setTimeout(() => {
        setRetryCount(0);
        setConnectionStatus('connecting');
      }, 5000);
    };

    ws.onerror = () => {
      setConnectionStatus('error');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return {
    connectionStatus,
    retryCount,
    reconnect: () => {
      setConnectionStatus('connecting');
      setRetryCount(0);
    }
  };
};

export default useWebSocket;