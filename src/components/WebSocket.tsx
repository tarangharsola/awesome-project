{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocket = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {ws ? <div>Connected to WebSocket server</div> : <div>Disconnected from WebSocket server</div>}
    </div>
  );
};

export default WebSocket;