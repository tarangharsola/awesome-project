{"import { useState, useEffect } from 'react';

interface ConflictResolverProps {
  users: { username: string; color: string; }[];
}

const useConflictResolver = ({ users }) => {
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setConflicts([]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [users]);

  return conflicts;
}

export default useConflictResolver;