{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [ot, setOt] = useState(new OperationalTransformation());

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    const handleResolve = (resolved) => {
      setConflicts((prevConflicts) => prevConflicts.filter((c) => c !== resolved));
    };

    setOt(new OperationalTransformation(handleConflict, handleResolve));
  }, []);

  return { conflicts, ot };
};

export default useConflictResolver;