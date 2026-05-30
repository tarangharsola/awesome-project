{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ users }) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'cursorPosition') {
          ws.send(JSON.stringify({ type: 'cursorPosition', cursorPositions: data.cursorPositions }));
        } else if (data.type === 'users') {
          ws.send(JSON.stringify({ type: 'users', users: data.users }));
        }
      };
    }
  }, [ws, users]);

  return null;
}

export default WebSocket;