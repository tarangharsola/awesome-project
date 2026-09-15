import React from 'react';
import { useUsers } from '../hooks/useUsers';
import './UserList.css';

export const UserList: React.FC = () => {
  const users = useUsers();

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-list-item">
          <span
            className="user-color-indicator"
            style={{ backgroundColor: user.color }}
          />
          <span className="user-name">{user.name}</span>
        </div>
      ))}
    </div>
  );
};