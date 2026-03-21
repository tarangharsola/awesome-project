{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  onMessage: (message: any) => void;
}

const WebSocket = ({ onMessage }) => {
  const [socket, setSocket] = useState(null);
  const { connect, send, close } = useWebSocket();

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        onMessage(event.data);
      };
    }
  }, [socket]);

  const handleSendMessage = () => {
    send({ type: 'message', value: 'Hello, world!' });
  };

  return (
    <div>
      <button onClick={handleSendMessage}>Send message</button>
    </div>
  );
}

export default WebSocket;