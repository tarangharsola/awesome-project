{"import React from 'react';
import { useUsers } from './useUsers';

interface Props {
}

const UserList = () => {
  const { users } = useUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;