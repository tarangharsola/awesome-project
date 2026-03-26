{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
}

const UserList: React.FC<UserListProps> = () => {
  const { users } = useUsers();

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1
    }}>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: 5,
          borderRadius: 5,
          fontSize: 12,
          color: '#fff'
        }}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;