{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [ot, setOt] = useState(new OperationalTransformation());

  useEffect(() => {
    const handleChanges = (changes) => {
      setConflicts(changes);
    };

    const handleReconnection = () => {
      setOt(new OperationalTransformation());
    };

    return () => {
      // cleanup
    };
  }, []);

  return {
    conflicts,
    ot,
    handleChanges,
    handleReconnection
  };
};

export default useConflictResolver;