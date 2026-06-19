{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ ws }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <p>Message: {message}</p>
    </div>
  );
}

export default WebSocket;