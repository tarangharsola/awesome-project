{"import React from 'react';
import User from './User';

function UserList({ users, onUserJoin, onUserLeave }) {
  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} onUserLeave={onUserLeave} />
      ))}
    </div>
  );
}

export default UserList;