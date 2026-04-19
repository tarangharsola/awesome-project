{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const ws = useWebSocket();
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <h1>WebSocket</h1>
      <UserList />
    </div>
  );
};

export default WebSocket;