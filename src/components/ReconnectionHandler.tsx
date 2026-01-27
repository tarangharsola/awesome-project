{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [ws, setWs] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const wsOptions = { reconnect: true, timeout: 10000 };

    const ws = new WebSocket(wsUrl, wsOptions);
    setWs(ws);

    ws.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setReconnecting(true);
    };

    ws.onerror = (event) => {
      console.log(`Error occurred: ${event.message}`);
    };

    ws.onreconnect = () => {
      console.log('Reconnecting to WebSocket server');
      setReconnecting(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>Reconnection Handler</h1>
      {reconnecting ? <p>Reconnecting...</p> : <p>Connected</p>}
    </div>
  );
};

export default ReconnectionHandler;