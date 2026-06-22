{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ socket }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <span>Message: {message}</span>
    </div>
  );
}

export default WebSocket;