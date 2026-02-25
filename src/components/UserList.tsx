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
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px'
        }}>
          <span style={{
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;