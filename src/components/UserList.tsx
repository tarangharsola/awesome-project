{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const activeUsers = users.filter(user => user.isConnected);
    setActiveUsers(activeUsers);
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
          justifyContent: "space-between",
        }}>
          <span style={{
            marginRight: "10px",
          }}>{user.name}</span>
          <span style={{
            fontSize: "12px",
          }}>{user.cursorPosition}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;