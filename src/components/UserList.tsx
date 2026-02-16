{"import React from 'react';
import { useState, useEffect } from 'react';
import { User } from './types';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const activeUsers = users.filter((user) => user.isActive);
    setActiveUsers(activeUsers);
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;