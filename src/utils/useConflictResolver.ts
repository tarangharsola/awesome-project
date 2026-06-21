{"import { useState, useEffect } from 'react';

interface ConflictResolverProps {
  users: { [name: string]: { color: string } }
}

const useConflictResolver = (users: ConflictResolverProps) => {
  const [conflict, setConflict] = useState(false);
  useEffect(() => {
    if (Object.keys(users).length > 1) {
      setConflict(true);
    } else {
      setConflict(false);
    }
  }, [users]);
  return conflict;
};

export default useConflictResolver;