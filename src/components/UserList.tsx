{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

function UserList() {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter(user => user.isConnected));
  }, [users]);

  const handleUserUpdate = (user) => {
    if (user.isConnected) {
      setActiveUsers((prevUsers) => prevUsers.concat(user));
    } else {
      setActiveUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    }
  };

  return (
    <div className="active-users-panel">
      <h2>Active Users:</h2>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id} style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;