{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ ws }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => ws.close();
  }, [ws]);

  return (
    <div>
      {message && <p>Received message: {message}</p>}
    </div>
  );
}

export default WebSocket;