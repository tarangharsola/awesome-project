{"import React from 'react';
import WebSocket from 'ws';

const WebSocket = () => {
  const ws = new WebSocket('ws://localhost:8080');

  return (
    <div>
      <span>Connected to WebSocket server</span>
    </div>
  );
};

export default WebSocket;