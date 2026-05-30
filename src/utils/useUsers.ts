{"import { useState, useEffect } from 'react';
import { users } from './users';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserUpdate = (event) => {
      setUsers(event.users);
    };

    document.addEventListener('userUpdate', handleUserUpdate);

    return () => {
      document.removeEventListener('userUpdate', handleUserUpdate);
    };
  }, []);

  return users;
};

export default useUsers;