import { useState, useEffect } from 'react';
import { users } from '../store/users';

export function useUsers() {
  const [users, setUsers] = useState(users);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUsers(users);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return users;
}