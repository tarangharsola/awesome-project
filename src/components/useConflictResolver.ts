{"import { useState, useEffect } from 'react';
import { OperationalTransform } from 'operational-transform';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const [transform, setTransform] = useState(new OperationalTransform());

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    return () => {
      setConflicts([]);
    };
  }, []);

  const resolveConflict = (operation) => {
    setTransform((prevTransform) => prevTransform.apply(operation));
  };

  return { conflicts, resolveConflict, transform };
};

export default useConflictResolver;