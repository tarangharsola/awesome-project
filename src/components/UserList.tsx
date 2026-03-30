{"import React from 'react';
import { useUsers } from './useUsers';

const UserList = () => {
  const users = useUsers();
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
}

export default UserList;