{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocket = ({ ws }) => {
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
      {message && <div>Received message: {message}</div>}
    </div>
  );
};

export default WebSocket;