{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const usersHook = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => {
        const index = prevUsers.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          return [...prevUsers.slice(0, index), user, ...prevUsers.slice(index + 1)];
        }
        return [...prevUsers, user];
      });
    };
    usersHook.on('userUpdate', handleUserUpdate);
    return () => usersHook.off('userUpdate', handleUserUpdate);
  }, [usersHook]);

  return users;
};

export default useAwareness;