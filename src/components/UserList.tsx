{"import React from 'react';
import { useUsers } from './useUsers';

interface Props {
  users: any[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
}

export default UserList;