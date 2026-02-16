{"import React, { useState, useEffect } from 'react';
import { WebSocket } from './WebSocket';

interface Props {
  onMessage: (message: string) => void;
}

const WebSocketComponent: React.FC<Props> = ({ onMessage }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
    ws.onmessage = (event) => {
      onMessage(event.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="websocket">
      {socket && <div>Connected to WebSocket</div>}
    </div>
  );
}

export default WebSocketComponent;