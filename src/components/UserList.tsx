{"import React from 'react';
import User from './User';

interface UserListProps {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div style={{
      padding: 16,
      backgroundColor: '#333',
      color: '#fff',
    }}>
      <h2>Active Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} style={{
            marginBottom: 8,
          }}>
            <User name={user.name} color={user.color} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;