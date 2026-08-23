import { useState } from 'react';
import { User } from '../types';

export const useAwareness = () => {
  const [users, setUsers] = useState<User[]>([]);

  const updateUser = (user: User) => {
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = user;
        return copy;
      }
      return [...prev, user];
    });
  };

  const removeUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return { users, updateUser, removeUser };
};