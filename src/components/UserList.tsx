{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: connectedUsers } = useUsers();

  useEffect(() => {
    setUsers(connectedUsers);
  }, [connectedUsers]);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          margin: '5px',
          display: 'inline-block',
          color: '#fff'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;