{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onclose = () => {
      setReconnecting(true);
    };
    return () => {
      ws.close();
    };
  }, []);

  if (reconnecting) {
    return <div>Reconnecting...</div);
  }

  return null;
};

export default ReconnectionHandler;