{"import React from 'react';
import { useUsers } from './useUsers';

interface Props {}

const UserList = () => {
  const { users } = useUsers();
  return (
    <div style={{
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    }}>
      {users.map((user) => (
        <div key={user.id} style={{
          padding: 5,
          backgroundColor: user.color,
          borderRadius: 5,
          marginBottom: 5,
        }}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;