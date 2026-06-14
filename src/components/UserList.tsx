{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../utils/useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter(user => user.isActive));
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          color: 'white',
          display: 'inline-block',
          marginRight: '10px'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;