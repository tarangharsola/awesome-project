{"import { useState, useEffect } from 'react';

interface ConflictResolverProps {
  users: { id: string; name: string; color: string; }[];
}

const useConflictResolver = ({ users }: ConflictResolverProps) => {
  const [conflicts, setConflicts] = useState<Record<string, string>>({});

  useEffect(() => {
    const conflicts: Record<string, string> = {};

    users.forEach((user) => {
      const { id, name, color } = user;

      conflicts[id] = name;
    });

    setConflicts(conflicts);
  }, [users]);

  return conflicts;
}

export default useConflictResolver;