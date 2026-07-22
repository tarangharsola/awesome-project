{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

interface Awareness {
  users: any[];
  addUser: (user: any) => void;
  removeUser: (user: any) => void;
}

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const usersHook = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };
    usersHook.on('userJoin', handleUserJoin);
    usersHook.on('userLeave', handleUserLeave);
    return () => {
      usersHook.off('userJoin', handleUserJoin);
      usersHook.off('userLeave', handleUserLeave);
    };
  }, [usersHook]);

  return { users, addUser: usersHook.addUser, removeUser: usersHook.removeUser };
};

export default useAwareness;