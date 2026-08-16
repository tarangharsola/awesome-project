import { useState, useEffect } from 'react';

const useConflictResolver = () => {
  const [conflict, setConflict] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setConflict(!conflict);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return conflict;
};

export default useConflictResolver;