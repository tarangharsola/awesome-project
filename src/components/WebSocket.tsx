{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ onMessage }) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      onMessage(event);
    };
    return () => ws.close();
  }, []);

  return null;
}

export default WebSocket;