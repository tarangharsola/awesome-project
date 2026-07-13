{"import React from 'react';
import User from './User';
import { useUsers } from '../utils/useUsers';

const UserList = () => {
  const users = useUsers();

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} name={user.name} color={user.color} />
      ))}
    </div>
  );
};

export default UserList;