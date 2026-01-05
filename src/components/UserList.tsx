{"import React from 'react';
import { useUsers } from './useUsers';

interface Props {
  users: { [key: string]: { color: string } };
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <ul className='user-list'>
      {Object.keys(users).map((user) => (
        <li key={user} style={{
          backgroundColor: users[user].color,
        }}>
          {user}
        </li>
      ))}
    </ul>
  );
}

export default UserList;