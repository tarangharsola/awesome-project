{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocket = ({ ws }) => {
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
      <span>Message: {message}</span>
    </div>
  );
};

export default WebSocket;