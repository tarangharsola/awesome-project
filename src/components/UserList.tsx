{"import React from 'react';
import { User } from './User';

const UserList = ({ users, onUserClick }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <User
          key={user.id}
          user={user}
          onClick={() => onUserClick(user.id)}
        />
      ))}
    </div>
  );
};

export default UserList;