{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
}

const UserList = () => {
  const users = useUsers();
  return (
    <div>
      {users.map((user) => (
        <div key={user.username}>{user.username}</div>
      ))}
    </div>
  );
}

export default UserList;