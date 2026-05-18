{"import { useState, useEffect } from 'react';

function useConflictResolver() {
  const [conflict, setConflict] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'conflict') {
        setConflict(true);
      } else if (data.type === 'resolved') {
        setResolved(true);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return [conflict, resolved];
}

export default useConflictResolver;