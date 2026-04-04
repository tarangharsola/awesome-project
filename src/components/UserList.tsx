{"import React from 'react';
import { User } from './User';

interface Props {
  users: User[];
  className?: string;
}

const UserList = ({ users, className }: Props) => {
  return (
    <div className={className || ''}>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          marginRight: '10px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;