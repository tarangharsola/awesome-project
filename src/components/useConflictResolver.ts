{"import { useState, useEffect } from 'react';

interface ConflictResolverProps {
  users: { id: string; name: string; color: string }[]
}

const useConflictResolver = ({ users }) => {
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setConflicts([]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return conflicts;
}

export default useConflictResolver;