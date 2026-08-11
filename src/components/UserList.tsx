{"import React from 'react';
import { User } from './User';

interface UserListProps {
  users: { id: string; name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;