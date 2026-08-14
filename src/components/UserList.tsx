{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface UserListProps {
  users: { name: string; color: string; }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div style={{
      padding: 10,
      backgroundColor: '#f0f0f0',
    }}>
      {users.map((user) => (
        <User key={user.name} user={user} />
      ))}
    </div>
  );
}

export default UserList;