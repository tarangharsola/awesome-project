{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { username: string; color: string; }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index} style={{
          backgroundColor: user.color,
          padding: 10,
          borderRadius: 5
        }}>{user.username}</li>
      ))}
    </ul>
  );
}

export default UserList;