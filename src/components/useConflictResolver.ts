{"import { useState, useEffect } from 'react';
import WebSocket from 'ws';

const useConflictResolver = () => {
  const [conflict, setConflict] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'conflict') {
        setConflict(message.data);
      }
    };
  }, []);

  const resolveConflict = (conflict) => {
    setConflict(conflict);
  };

  return { resolveConflict };
};

export default useConflictResolver;