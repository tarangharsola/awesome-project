{"import React from 'react';
import { WebSocket } from 'ws';

interface AwarenessConsistencyProps {
  ws: WebSocket;
  onAwareness: (awareness: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ ws, onAwareness }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      ws.send(JSON.stringify({ type: 'awareness' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  ws.onmessage = (event) => {
    if (event.data.type === 'awareness') {
      onAwareness(event.data.awareness);
    }
  };

  return null;
};

export default AwarenessConsistency;