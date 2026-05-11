{"import React from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const users = useUsers();
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          marginRight: '10px',
          color: '#fff'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;