{"import React from 'react';
import { useUsers } from '../utils/useUsers';

const User = () => {
  const users = useUsers();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default User;