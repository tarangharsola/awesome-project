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
      <p>Message: {message}</p>
    </div>
  );
}

export default WebSocket;