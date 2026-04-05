{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => {
      setConnected(false);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  );
}

export default WebSocket;