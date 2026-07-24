{"import React from 'react';
import User from './User';

const UserList = ({ users, onUserJoin, onUserLeave }) => {
  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} onUserJoin={onUserJoin} onUserLeave={onUserLeave} />
      ))}
    </div>
  );
};

export default UserList;