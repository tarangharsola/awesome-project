{"import React from 'react';
import { User } from './User';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#333',
      color: '#fff',
    }}>
      {users.map((user, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <span style={{
            marginRight: 10,
            fontSize: 16,
            color: '#fff',
          }}>{user.name}</span>
          <span style={{
            fontSize: 16,
            color: '#fff',
          }}>{user.cursorPosition}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;