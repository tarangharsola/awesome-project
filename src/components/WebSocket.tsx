{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ language, document }) {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'document', document }));
    }
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send message</button>
      <div>Message: {message}</div>
    </div>
  );
}

export default WebSocket;