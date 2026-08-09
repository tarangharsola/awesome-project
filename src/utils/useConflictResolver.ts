{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'operational-transformation';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const ot = new OperationalTransformation();
    ot.on('conflict', (conflict) => {
      setConflicts(conflict);
    });
    ot.on('resolved', () => {
      setResolved(true);
    });
    return () => {
      ot.destroy();
    };
  }, []);

  return { conflicts, resolved };
};

export default useConflictResolver;