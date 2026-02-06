{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: any[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name} ({user.color})</div>
      ))}
    </div>
  );
};

export default UserList;