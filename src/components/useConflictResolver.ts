{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState({});
  const [ot, setOt] = useState(new OperationalTransformation());

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts(conflict);
    };
    ot.on('conflict', handleConflict);
    return () => ot.off('conflict', handleConflict);
  }, []);

  return { conflicts, ot };
};

export default useConflictResolver;