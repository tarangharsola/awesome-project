{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

interface Awareness {
  updateAwareness: (user: any) => void;
}

const useAwareness = (): Awareness => {
  const [awareness, setAwareness] = useState({});
  const users = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('update', handleUserUpdate);
    return () => users.off('update', handleUserUpdate);
  }, [users]);

  return {
    updateAwareness: (user) => setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user })),
  };
};

export default useAwareness;