import React from 'react';
import { useWebSocket } from 'react-use-websocket';

interface WebSocketProps {
  url: string;
}

const WebSocket: React.FC<WebSocketProps> = ({ url }) => {
  const { sendJsonMessage, lastMessage } = useWebSocket(url);

  return (
    <div>
      <h2>WebSocket</h2>
      <p>Last Message: {lastMessage}</p>
      <button onClick={() => sendJsonMessage({ type: 'ping' })}>Send Ping</button>
    </div>
  );
};

export default WebSocket;