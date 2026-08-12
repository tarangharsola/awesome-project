{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const { users } = useUsers();

  useEffect(() => {
    const handleUserUpdate = (updatedUser) => {
      // Update awareness state with user updates
      const updatedAwareness = updateAwareness(awareness, updatedUser);
      setAwareness(updatedAwareness);
    };

    users.on('update', handleUserUpdate);
    return () => users.off('update', handleUserUpdate);
  }, [users, awareness]);

  return awareness;
};

export default useAwareness;