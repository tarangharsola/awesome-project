{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'users') {
          ws.send(JSON.stringify({ type: 'users', users: data.users }));
        } else if (data.type === 'editorValue') {
          ws.send(JSON.stringify({ type: 'editorValue', editorValue: data.editorValue }));
        }
      };
    }
  }, [ws]);

  return (
    <div>
      <div>Connected to WebSocket server</div>
    </div>
  );
}

export default WebSocket;