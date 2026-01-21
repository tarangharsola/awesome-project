{"import React from 'react';
import { useUsers } from './useUsers';

const UserList = () => {
  const users = useUsers();

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;