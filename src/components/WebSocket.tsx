import React from 'react';
import { useWebSocket } from './useWebSocket';

interface WebSocketProps {
  webSocket: any;
}

const WebSocket: React.FC<WebSocketProps> = ({ webSocket }) => {
  const { send, receive } = useWebSocket();

  const handleSendMessage = () => {
    send({ type: 'message', text: 'Hello, world!' });
  };

  return (
    <div>
      <h2>WebSocket</h2>
      <button onClick={handleSendMessage}>Send message</button>
    </div>
  );
};

export default WebSocket;