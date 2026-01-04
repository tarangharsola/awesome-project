{"import React from 'react';
import { User } from '../types';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <ul className='user-list'>
      {users.map((user, index) => (
        <li key={index} className='user-item'>
          <span className='user-name'>{user.name}</span>
          <span className='user-color' style={{ backgroundColor: user.color }} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;