{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useConflictResolver() {
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'conflict') {
        setConflict(true);
      }
    };
    return () => ws.close();
  }, []);

  return conflict;
}

export default useConflictResolver;