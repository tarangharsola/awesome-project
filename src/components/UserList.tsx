{"import React from 'react';
import { User } from './User';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <span style={{
            backgroundColor: user.color,
            color: 'white',
            padding: '4px 8px',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px'
          }}>
            {user.name}
          </span>
          <span>{user.cursorPosition}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;