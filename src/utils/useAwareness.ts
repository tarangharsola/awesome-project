{"import { useState, useEffect } from 'react';

interface AwarenessProps {
  users: { [name: string]: { color: string } }
}

const useAwareness = (users: AwarenessProps) => {
  const [awareness, setAwareness] = useState({} as { [name: string]: { color: string } });
  useEffect(() => {
    setAwareness(users);
  }, [users]);
  return awareness;
};

export default useAwareness;