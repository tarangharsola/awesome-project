{"import { useState, useEffect } from 'react';
import { ConflictResolver } from 'operational-transform';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const resolver = new ConflictResolver();
    resolver.on('conflict', (conflict) => setConflicts(conflict));
    resolver.on('resolved', () => setResolved(true));
    return () => resolver.destroy();
  }, []);

  return { conflicts, resolved };
};

export default useConflictResolver;