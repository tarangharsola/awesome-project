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
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;