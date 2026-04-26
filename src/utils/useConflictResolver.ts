{"import { useState, useEffect } from 'react';
import { OperationalTransformation } from 'ot-js';

const useConflictResolver = () => {
  const [ot, setOt] = useState(null);

  useEffect(() => {
    const ot = new OperationalTransformation();
    setOt(ot);

    return () => {
      // Clean up
    };
  }, []);

  return ot;
};

export default useConflictResolver;