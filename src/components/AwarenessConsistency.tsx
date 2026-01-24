{"import React from 'react';
import { WebSocket } from 'ws';

interface AwarenessConsistencyProps {
  ws: WebSocket;
  onAwareness: (awareness: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ ws, onAwareness }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      ws.send(JSON.stringify({ type: 'awareness' }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default AwarenessConsistency;