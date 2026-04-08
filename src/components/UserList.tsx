import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { id: string; name: string; color: string }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <span style={{ color: user.color }}>{user.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;