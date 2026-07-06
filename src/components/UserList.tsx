{"import React from 'react';
import User from './User';

function UserList({ users }) {
  return (
    <div className='user-list'>
      {users.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
}

export default UserList;