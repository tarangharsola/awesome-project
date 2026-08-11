{"import { useState, useEffect } from 'react';
import { OT } from 'operational-transform';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    const handleResolve = () => {
      setResolved(true);
    };

    return () => {
      handleConflict(null);
      handleResolve();
    };
  }, []);

  return { conflicts, resolved };
};

export default useConflictResolver;