{"import React from 'react';
import { User } from './User';

interface Props {
  users: User[];
}

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <span className="username">{user.name}</span>
          <span className="color" style={{ backgroundColor: user.color }}></span>
        </div>
      ))}
    </div>
  );
};

export default UserList;