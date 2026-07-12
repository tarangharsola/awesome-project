{"import React from 'react';
import User from './User';
import { useUsers } from './useUsers';

const UserList = () => {
  const users = useUsers();

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#333',
      color: '#fff',
    }}>
      {users.map((user) => (
        <User key={user.id} name={user.name} color={user.color} />
      ))}
    </div>
  );
}

export default UserList;