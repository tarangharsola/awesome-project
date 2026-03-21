{"import React from 'react';
import { useState, useEffect } from 'react';

const UserList = ({ users, color }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#333',
      color: '#fff',
    }}>
      <h2>Active Users</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index} style={{
            backgroundColor: color,
            padding: 5,
            borderRadius: 5,
            marginBottom: 5,
          }}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;