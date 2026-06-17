{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const { send, close, reconnect } = useWebSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectionStatus === 'Disconnected') {
        reconnect();
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [connectionStatus, reconnect]);

  const handleConnectionStatus = (status) => {
    setConnectionStatus(status);
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <button onClick={() => close()}>Close Connection</button>
      <button onClick={() => reconnect()}>Reconnect</button>
    </div>
  );
};
export default WebSocket;