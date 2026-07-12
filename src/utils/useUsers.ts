{"import { useState, useEffect } from 'react';
import { users } from './users';

function useUsers() {
  const [users, setUsers] = useState(users);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  return users;
}

export default useUsers;