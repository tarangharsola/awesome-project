{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [conflict, setConflict] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const ot = new OperationalTransformation();
    ot.on('conflict', (conflict) => setConflict(conflict));
    ot.on('resolved', () => setResolved(true));
  }, []);

  return { conflict, resolved };
};

export default useConflictResolver;