{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const WebSocketComponent = () => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
      <p>{message}</p>
    </div>
  );
};

export default WebSocketComponent;