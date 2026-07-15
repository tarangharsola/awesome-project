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
      {ws ? (
        <div>
          <h2>Connected to WebSocket server</h2>
        </div>
      ) : (
        <div>
          <h2>Disconnected from WebSocket server</h2>
        </div>
      )}
    </div>
  );
};

export default WebSocket;