{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ ws }) {
  const [message, setMessage] = useState(null);

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
      <span>Message: {message}</span>
    </div>
  );
}

export default WebSocket;