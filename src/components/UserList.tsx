{"import React from 'react';
import { useUsers } from './useUsers';

const UserList = () => {
  const users = useUsers();

  return (
    <div>
      {users.map((user) => (
        <span key={user.id}>{user.name}</span>
      ))}
    </div>
  );
};

export default UserList;