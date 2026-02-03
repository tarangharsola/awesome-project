{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketComponent = () => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      // Handle incoming messages
    };
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default WebSocketComponent;