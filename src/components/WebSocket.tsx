{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketComponent = () => {
  const [connected, setConnected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => {
      setConnected(false);
      setRetryCount(retryCount + 1);
    };
  }, [retryCount]);

  return (
    <div>
      {connected ? 'Connected' : `Disconnected (retry count: ${retryCount})`}
    </div>
  );
};

export default WebSocketComponent;