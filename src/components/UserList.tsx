import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import './UserList.css';
import './UserListOverrides.css'; // Added overrides for dark‑mode readability

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.list);

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <span
            className="user-color-indicator"
            style={{ backgroundColor: user.color }}
          />
          <span className="user-name" title={user.name}>
            {user.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
