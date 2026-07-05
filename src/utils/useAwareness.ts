{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const users = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    const handleUserLeave = (userId) => {
      setAwareness((prevAwareness) => {
        const awareness = { ...prevAwareness };
        delete awareness[userId];
        return awareness;
      });
    };

    users.on('join', handleUserJoin);

    users.on('leave', handleUserLeave);

    return () => {
      users.off('join', handleUserJoin);
      users.off('leave', handleUserLeave);
    };
  }, [users]);

  return awareness;
};

export default useAwareness;