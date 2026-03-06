{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      WebSocket.onMessage(message);
    };

    return () => {
      ws.close();
    };
  }, []);

  const onMessage = (message) => {
    // Handle incoming messages
  };

  const send = (message) => {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  };

  return {
    connected,
    onMessage,
    send,
  };
};

export default WebSocket;