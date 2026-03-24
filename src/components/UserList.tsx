{"import React from 'react';
import { User } from './User';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <span className="username">{user.name}</span>
          <span className="cursor-label" style={{
            backgroundColor: user.color,
            color: 'white',
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '12px',
          }}>
            {user.cursorPosition}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;