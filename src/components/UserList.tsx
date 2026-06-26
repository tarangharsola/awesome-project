{"import React from 'react';
import User from './User';

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <User key={user.id} name={user.name} color={user.color} />
      ))}
    </div>
  );
}; export default UserList;