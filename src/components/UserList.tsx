{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  users: { userId: string; username: string; color: string }[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.userId} style={{
          backgroundColor: user.color,
          padding: 10,
        }}>{user.username}</li>
      ))}
    </ul>
  );
}

export default UserList;