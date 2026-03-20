{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { id: string; name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} style={{
          backgroundColor: user.color,
          padding: '10px',
          borderRadius: '10px',
        }}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;