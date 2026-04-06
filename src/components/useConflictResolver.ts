{"import { useState, useEffect } from 'react';

interface ConflictResolverProps {
  children: React.ReactNode;
}

const useConflictResolver = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    const handleConflict = (newValue: any) => {
      if (newValue !== value) {
        setConflict(true);
      }
    };

    return () => {
      setConflict(false);
    };
  }, []);

  return {
    value,
    conflict,
    setValue,
    handleConflict
  };
}

export default useConflictResolver;