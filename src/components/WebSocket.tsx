{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const [ws, setWs] = useState(null);
  const { reconnect } = useWebSocket();

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = {
      // Add any WebSocket options here
    };
    const ws = new WebSocket(wsUrl, wsOptions);
    setWs(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Handle WebSocket connection established
    } else if (ws && ws.readyState === WebSocket.CLOSING) {
      // Handle WebSocket connection closing
    } else if (ws && ws.readyState === WebSocket.CLOSED) {
      // Handle WebSocket connection closed
    }
  }, [ws]);

  return <div>WebSocket connection status: {ws ? ws.readyState : 'Disconnected'}</div>;
};

export default WebSocket;