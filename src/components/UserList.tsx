{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const activeUsers = users.filter(user => user.isActive);
    setActiveUsers(activeUsers);
  }, [users]);

  return (
    <div className="active-users-panel">
      <h2>Active Users</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index} style={{
            backgroundColor: user.color,
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            marginRight: '10px'
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;