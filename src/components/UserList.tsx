{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: connectedUsers } = useUsers();

  useEffect(() => {
    setUsers(connectedUsers);
  }, [connectedUsers]);

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user">
          <span className="username">{user.username}</span>
          <span className="color" style={{ backgroundColor: user.color }}></span>
        </div>
      ))}
    </div>
  );
};

export default UserList;