{"import { useState, useEffect } from 'react';
import { OperationalTransform } from 'ot.js';

const useConflictResolver = () => {
  const [ot, setOt] = useState(new OperationalTransform());
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    const handleChanges = (changes) => {
      setConflicts(changes);
      setOt(ot.apply(changes));
    };

    const handleConflict = (conflict) => {
      setConflicts([...conflicts, conflict]);
    };

    return () => {
      // cleanup
    };
  }, []);

  return { conflicts, ot, handleChanges, handleConflict };
};

export default useConflictResolver;