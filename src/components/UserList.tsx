{"import React from 'react';
import User from './User';

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <User key={user.username} user={user} />
      ))}
    </div>
  );
}

export default UserList;