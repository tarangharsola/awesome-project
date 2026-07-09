{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

interface Awareness {
  updateAwareness: (user: any) => void;
}

const useAwareness = () => {
  const users = useUsers();
  const [awareness, setAwareness] = useState({} as any);

  useEffect(() => {
    if (users) {
      const awareness = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setAwareness(awareness);
    }
  }, [users]);

  const updateAwareness = (user: any) => {
    setAwareness((prevAwareness) => {
      const newAwareness = { ...prevAwareness, [user.id]: user);
      return newAwareness;
    });
  };

  return { awareness, updateAwareness };
};

export default useAwareness;