{"import { useState, useEffect } from 'react';
import { users } from './users';

function useAwareness() {
  const [users, setUsers] = useState(users);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  return users;
}

export default useAwareness;