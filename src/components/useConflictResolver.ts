{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [ot, setOt] = useState(new OperationalTransformation());

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    const handleResolve = () => {
      setConflicts([]);
    };

    ot.on('conflict', handleConflict);
    ot.on('resolve', handleResolve);

    return () => {
      ot.off('conflict', handleConflict);
      ot.off('resolve', handleResolve);
    };
  }, []);

  return { conflicts, ot };
};

export default useConflictResolver;