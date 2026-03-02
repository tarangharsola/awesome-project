{"import React, { useState, useEffect } from 'react';

interface Props {
  onMessage: (message: string) => void;
}

const WebSocket: React.FC<Props> = ({ onMessage }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
    ws.onmessage = (event) => {
      onMessage(event.data);
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.send('Hello from client!');
    }
  }, [socket]);

  return null;
}

export default WebSocket;