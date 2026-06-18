{"import React from 'react';
import { User } from './User';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <span className="username">{user.username}</span>
          <span className="color" style={{ backgroundColor: user.color }}></span>
        </div>
      ))}
    </div>
  );
}

export default UserList;