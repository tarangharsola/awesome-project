{"import React from 'react';
import User from './User';

interface UserListProps {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#333',
      color: '#fff',
    }}>
      <h2 style={{
        marginBottom: '8px',
      }}>Active Users:</h2>
      <ul style={{
        listStyle: 'none',
        padding: '0',
        margin: '0',
      }}>
        {users.map((user, index) => (
          <li key={index} style={{
            marginBottom: '8px',
          }}>
            <User name={user.name} color={user.color} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;