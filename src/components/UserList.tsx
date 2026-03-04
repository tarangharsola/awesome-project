{"import React from 'react';
import { useUsers } from './useUsers';

interface Props {
  users: { username: string; color: string; }[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <div style={{
            width: 10,
            height: 10,
            backgroundColor: user.color,
            borderRadius: '50%',
          }}/>
          <span style={{
            marginLeft: 10,
          }}>{user.username}</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;