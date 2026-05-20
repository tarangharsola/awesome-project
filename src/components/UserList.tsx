{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

interface User {
  id: string;
  name: string;
  color: string;
}

const UserList = () => {
  const users = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const activeUsers = users.filter((user) => user.isConnected);
    setActiveUsers(activeUsers);
  }, [users]);

  return (
    <div className="active-users">
      <h2>Active Users</h2>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id} style={{
            backgroundColor: user.color,
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px',
            marginBottom: '5px'
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;