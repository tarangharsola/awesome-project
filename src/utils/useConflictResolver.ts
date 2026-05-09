{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'operational-transformation';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState({});
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const ot = new OperationalTransformation();
    ot.resolveConflicts(conflicts);
    setResolved(true);
  }, [conflicts]);

  return [conflicts, setConflicts, resolved];
};

export default useConflictResolver;