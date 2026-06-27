{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ConflictResolver {
  resolveConflict: (conflict: any) => void;
}

const useConflictResolver = () => {
  const { send } = useWebSocket();
  const [conflicts, setConflicts] = useState<Record<string, any>>({});

  useEffect(() => {
    const handleConflict = (conflict: any) => {
      setConflicts((prevConflicts) => ({ ...prevConflicts, [conflict.id]: conflict }));
    };

    send({ type: 'RESOLVE_CONFLICT', payload: handleConflict });
  }, []);

  const resolveConflict = (conflict: any) => {
    setConflicts((prevConflicts) => {
      delete prevConflicts[conflict.id];
      return prevConflicts;
    });
    send({ type: 'RESOLVE_CONFLICT', payload: conflict });
  };

  return { resolveConflict, conflicts };
};

export default useConflictResolver;