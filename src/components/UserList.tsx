{"import React from 'react';
import { useUsers } from './useUsers';

interface Props {
  users: { id: string; name: string; color: string }[]
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} style={{
          backgroundColor: user.color
        }}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;