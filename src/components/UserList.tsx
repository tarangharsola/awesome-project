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
          <span className="user-name">{user.name}</span>
          <span className="user-color" style={{ backgroundColor: user.color }}></span>
        </div>
      ))}
    </div>
  );
};

export default UserList;