{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../utils/useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveUsers(users);
    }, 1000);
    return () => clearInterval(intervalId);
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
          <span style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}>{user.name}</span>
          <span style={{
            fontSize: "12px",
            color: "#ccc",
          }}>{user.cursorPosition}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;