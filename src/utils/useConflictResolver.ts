{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [ot, setOt] = useState(new OperationalTransformation());

  useEffect(() => {
    const handleChanges = (changes) => {
      setConflicts(changes);
    };
    ot.on('changes', handleChanges);
    return () => {
      ot.off('changes', handleChanges);
    };
  }, []);

  return { conflicts, ot };
};

export default useConflictResolver;