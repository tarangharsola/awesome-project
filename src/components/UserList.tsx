{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { name: string; color: string }[]
}

const UserList = ({ users }: UserListProps) => {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
}

export default UserList;