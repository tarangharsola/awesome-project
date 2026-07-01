{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const { users } = useUsers();

  useEffect(() => {
    const handleUserUpdate = (newUser) => {
      // Update awareness state with new user information
      const updatedAwareness = {
        ...awareness,
        [newUser.id]: newUser,
      };
      setAwareness(updatedAwareness);
    };

    users.on('update', handleUserUpdate);

    return () => {
      users.off('update', handleUserUpdate);
    };
  }, [awareness, users]);

  return awareness;
};

export default useAwareness;