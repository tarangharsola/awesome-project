{"import React from 'react';
import { useUsers } from '../utils/useUsers';

const UserList = () => {
  const users = useUsers();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;