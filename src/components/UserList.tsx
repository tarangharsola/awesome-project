{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../utils/useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter(user => user.isActive));
  }, [users]);

  const handleUserUpdate = (user) => {
    if (user.isActive) {
      setActiveUsers((prevUsers) => prevUsers.concat(user));
    } else {
      setActiveUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    }
  };

  return (
    <div className="active-users">
      <h2>Active Users</h2>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id} style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            display: 'inline-block',
            marginRight: '10px',
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;