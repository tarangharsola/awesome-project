{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface AwarenessConsistencyProps {
  children: React.ReactNode;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ children }) => {
  const [awareness, setAwareness] = useState({ cursors: [], users: [] });
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const handleAwareness = (awareness: any) => {
      setAwareness(awareness);
    };
    const ws = new WebSocket('ws://localhost:8080');
    setWs(ws);
    ws.onmessage = (event) => {
      const awareness = JSON.parse(event.data);
      handleAwareness(awareness);
    };
    return () => {
      ws?.close();
    };
  }, []);

  return (
    <div>
      {children}
      {awareness.cursors.map((cursor, index) => (
        <div key={index}>{cursor}</div>
      ))}
      {awareness.users.map((user, index) => (
        <div key={index}>{user}</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;