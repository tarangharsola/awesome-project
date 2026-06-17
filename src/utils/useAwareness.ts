{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const usersHook = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        const index = updatedUsers.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          updatedUsers[index] = user;
        } else {
          updatedUsers.push(user);
        }
        return updatedUsers;
      });
    };

    usersHook.on('userUpdate', handleUserUpdate);
    return () => usersHook.off('userUpdate', handleUserUpdate);
  }, [usersHook]);

  return users;
};

export default useAwareness;