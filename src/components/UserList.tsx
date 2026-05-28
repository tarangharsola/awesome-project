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
          <span className="cursor-label" style={{
            backgroundColor: user.color,
            color: "#fff",
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "12px",
          }}>
            {user.cursorPosition}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;