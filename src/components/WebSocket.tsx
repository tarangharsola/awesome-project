{"import React from 'react';
import { useWebSocket } from '../utils/useWebSocket';

const WebSocket = () => {
  const socket = useWebSocket();
  return (
    <div>
      <h1>WebSocket</h1>
      <UserList />
    </div>
  );
};

export default WebSocket;