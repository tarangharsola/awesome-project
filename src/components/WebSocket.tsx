{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ onUserJoin, onUserLeave }) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        onUserJoin(data.users);
      } else if (data.type === 'updateCursorPositions') {
        onUserLeave(data.cursorPositions);
      }
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
    return () => {
      ws.close();
    };
  }, []);

  return null;
}

export default WebSocket;