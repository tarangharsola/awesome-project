{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocket = () => {
  const [ws, setWs] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      rejectUnauthorized: false,
    };

    const reconnect = () => {
      setRetryCount(0);
      setWs(new WebSocket(wsUrl, wsOptions));
    };

    setWs(new WebSocket(wsUrl, wsOptions));

    ws.on('open', () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
    });

    ws.on('close', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
      reconnect();
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      reconnect();
    });

    return () => {
      ws.close();
    };
  }, []);

  return null;
};

export default WebSocket;