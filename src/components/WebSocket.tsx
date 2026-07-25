{"import React, { useState, useEffect } from 'react';
import useWebSocket from './useWebSocket';

const WebSocket = () => {
  const { connectionStatus, reconnect } = useWebSocket();

  useEffect(() => {
    if (connectionStatus === 'reconnecting') {
      reconnect();
    }
  }, [connectionStatus, reconnect]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={reconnect}>Reconnect</button>
    </div>
  );
};

export default WebSocket;