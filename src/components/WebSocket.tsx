{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket() {
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
      {ws ? 'Connected' : 'Disconnected'}
    </div>
  );
}

export default WebSocket;