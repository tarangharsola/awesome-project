{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

interface ConflictResolverState {
  document: string;
  conflicts: { [id: string]: string };
}

const useConflictResolver = () => {
  const [conflictResolverState, setConflictResolverState] = useState<ConflictResolverState>({ document: '', conflicts: {} });
  const ot = new OperationalTransformation();

  useEffect(() => {
    ot.on('conflict', (id: string, conflict: string) => {
      setConflictResolverState((prev) => ({ ...prev, conflicts: { ...prev.conflicts, [id]: conflict } }));
    });
  }, []);

  return conflictResolverState;
};

export default useConflictResolver;