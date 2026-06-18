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
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (ws) {
      ws.send(message);
    }
  };

  return (
    <div>
      <button onClick={() => sendMessage('updateUsers')}>Update Users</button>
      <button onClick={() => sendMessage('updateEditorContent')}>Update Editor Content</button>
    </div>
  );
}

export default WebSocket;