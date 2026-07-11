{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

interface Awareness {
  users: any[];
}

const useAwareness = () => {
  const [users, setUsers] = useState<any[]>([]);
  const usersList = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user: any) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    usersList.on('update', handleUserUpdate);

    return () => {
      usersList.off('update', handleUserUpdate);
    };
  }, [usersList]);

  return { users };
};

export default useAwareness;