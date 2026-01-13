{"import React from 'react';
import { useUserList } from './useUserList';

const UserList = () => {
  const users = useUserList();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
};

export default UserList;