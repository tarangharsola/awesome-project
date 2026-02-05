{"import React from 'react';
import { User } from './types';

interface Props {
  users: User[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
};

export default UserList;