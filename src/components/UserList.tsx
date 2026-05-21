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
        <div key={index} className="user">
          <span className="username">{user.username}</span>
          <span className="color" style={{ backgroundColor: user.color }}></span>
        </div>
      ))}
    </div>
  );
};

export default UserList;