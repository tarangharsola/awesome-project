{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const users = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('userUpdate', handleUserUpdate);

    return () => users.off('userUpdate', handleUserUpdate);
  }, [users]);

  return awareness;
};

export default useAwareness;