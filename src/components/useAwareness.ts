{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const usersHook = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    usersHook.on('userUpdate', handleUserUpdate);

    return () => usersHook.off('userUpdate', handleUserUpdate);
  }, [usersHook]);

  return users;
};

export default useAwareness;