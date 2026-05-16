{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const usersHook = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    usersHook.on('userJoin', handleUserJoin);

    return () => {
      usersHook.off('userJoin', handleUserJoin);
    };
  }, [usersHook]);

  useEffect(() => {
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    usersHook.on('userLeave', handleUserLeave);

    return () => {
      usersHook.off('userLeave', handleUserLeave);
    };
  }, [usersHook]);

  return users;
};

export default useAwareness;