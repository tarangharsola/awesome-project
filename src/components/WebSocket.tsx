{"import React, { useState, useEffect } from 'react';
import { ReconnectionHandler } from './ReconnectionHandler';

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <ReconnectionHandler connected={connected} />
    </div>
  );
};

export default WebSocket;