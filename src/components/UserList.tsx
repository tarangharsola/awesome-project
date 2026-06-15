{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  users: { name: string; color: string; }[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul style={{
      listStyle: 'none',
      padding: 0,
      margin: 0
    }}>
      {users.map((user, index) => (
        <li key={index} style={{
          display: 'inline-block',
          marginRight: 10,
          backgroundColor: user.color,
          padding: 5,
          borderRadius: 5
        }}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;