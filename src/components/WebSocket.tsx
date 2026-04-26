{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const { reconnect, connectionStatus: wsConnectionStatus } = useWebSocket();

  useEffect(() => {
    setConnectionStatus(wsConnectionStatus);
  }, [wsConnectionStatus]);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={reconnect}>Reconnect</button>
    </div>
  );
};

export default WebSocket;