{"import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function useConflictResolver() {
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    WebSocket.connect();
    return () => WebSocket.disconnect();
  }, []);

  return { conflicts };
}

export default useConflictResolver;