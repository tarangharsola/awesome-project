{"import { ConflictResolver } from 'ot.js';
import { useState, useEffect } from 'react';

const useConflictResolver = () => {
  const [conflictResolver, setConflictResolver] = useState(null);
  useEffect(() => {
    const conflictResolver = new ConflictResolver();
    setConflictResolver(conflictResolver);
    return () => conflictResolver.destroy();
  }, []);
  return conflictResolver;
};

export default useConflictResolver;