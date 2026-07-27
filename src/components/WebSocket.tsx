{"import React, { useState, useEffect } from 'react';
import WebSocket from 'ws';

function WebSocket({ ws }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    return () => ws.close();
  }, []);

  return (
    <div>
      {connected ? <p>Connected</p> : <p>Disconnected</p>}
    </div>
  );
}

export default WebSocket;