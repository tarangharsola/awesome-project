{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => ws.close();
  }, []);
  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};

export default WebSocketProvider;