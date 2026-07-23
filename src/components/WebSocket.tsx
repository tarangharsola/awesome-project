{"import React from 'react';
import useWebSocket from './useWebSocket';

const WebSocket = () => {
  const { connectionStatus, reconnect } = useWebSocket('ws://localhost:8080');

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={reconnect}>Reconnect</button>
    </div>
  );
};

export default WebSocket;