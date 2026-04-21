{"import React from 'react';
import { useWebSocket } from './useWebSocket';

function WebSocket() {
  const webSocket = useWebSocket();
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {webSocket.children}
    </div>
  );
}

export default WebSocket;