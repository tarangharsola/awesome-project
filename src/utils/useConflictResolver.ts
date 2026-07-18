{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'operational-transformation';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState({});
  const [ot, setOt] = useState(new OperationalTransformation());

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts(conflict);
    };

    const handleReconciliation = (reconciled) => {
      setConflicts({});
    };

    ot.on('conflict', handleConflict);
    ot.on('reconciliation', handleReconciliation);

    return () => {
      ot.off('conflict', handleConflict);
      ot.off('reconciliation', handleReconciliation);
    };
  }, []);

  return { conflicts, ot };
};

export default useConflictResolver;