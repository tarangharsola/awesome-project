{"import { useState, useEffect } from 'react';

interface AwarenessProps {
  users: { id: string; name: string; color: string; }[];
}

const useAwareness = ({ users }: AwarenessProps) => {
  const [awareness, setAwareness] = useState<Record<string, string>>({});

  useEffect(() => {
    const awareness: Record<string, string> = {};

    users.forEach((user) => {
      const { id, name, color } = user;

      awareness[id] = name;
    });

    setAwareness(awareness);
  }, [users]);

  return awareness;
}

export default useAwareness;