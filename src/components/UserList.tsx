{"import React from 'react';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  color: string;
}

interface Props {
  users: User[];
}

const UserList: React.FC<Props> = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#333',
      color: '#fff',
    }}>
      <h2>Active Users</h2>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}>
        {activeUsers.map((user, index) => (
          <li key={index} style={{
            backgroundColor: user.color,
            padding: 10,
            margin: 5,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{
              marginRight: 10,
              fontSize: 16,
              fontWeight: 'bold',
            }}>{user.name}</span>
            <span style={{
              fontSize: 14,
              color: '#ccc',
            }}>({user.id})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;