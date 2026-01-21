{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface AwarenessConsistencyProps {
  ws: WebSocket;
  onAwareness: (awareness: { user: string; cursor: number }) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ ws, onAwareness }) => {
  const [awareness, setAwareness] = useState({ user: '', cursor: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (ws.readyState && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'awareness', awareness }));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [ws, awareness]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'awareness') {
        setAwareness(message.awareness);
        onAwareness(message.awareness);
      }
    };
  }, [ws, onAwareness]);

  return null;
};

export default AwarenessConsistency;