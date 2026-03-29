{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter((user) => user.isActive));
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          color: "#fff",
          padding: "5px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}>
          <span>{user.name}</span>
          <span> ({user.cursorPosition})</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;