{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const { reconnecting, retryCount, handleConnectionStatus } = useReconnection();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setConnectionStatus('connected');
      handleConnectionStatus('connected');
    };
    ws.onclose = () => {
      setConnectionStatus('disconnected');
      handleConnectionStatus('disconnected');
    };
    ws.onerror = () => {
      setConnectionStatus('error');
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
    </div>
  );
};

export default WebSocket;