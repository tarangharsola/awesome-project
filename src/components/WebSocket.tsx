{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ ws }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

export default WebSocket;