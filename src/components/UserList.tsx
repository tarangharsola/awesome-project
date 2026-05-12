{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter(user => user.isConnected));
  }, [users]);

  return (
    <div>
      <h2>Active Users</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index} style={{
            backgroundColor: user.color,
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            margin: '5px'
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;