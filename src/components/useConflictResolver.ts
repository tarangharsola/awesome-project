{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState({});
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('conflicts', (data) => setConflicts(data));
  }, []);

  return { conflicts, resolveConflict: (conflict) => send('conflict', conflict) };
};

export default useConflictResolver;