import { useState, useEffect } from 'react';

const useAwareness = () => {
  const [awareness, setAwareness] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAwareness(!awareness);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return awareness;
};

export default useAwareness;