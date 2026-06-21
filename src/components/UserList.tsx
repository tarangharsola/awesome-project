{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
}

const UserList = () => {
  const users = useUsers();
  return (
    <div style={{
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      border: '1px solid black'
    }}>
      {users.map((user) => (
        <User key={user.name} user={user} />
      ))}
    </div>
  );
}

export default UserList;