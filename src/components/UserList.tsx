{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

function UserList() {
  const { users, addUser, removeUser } = useUsers();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter(user => user.isConnected));
  }, [users]);

  return (
    <div className="active-users-panel">
      <h2>Active Users:</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={index} style={{
            backgroundColor: user.color,
            color: "#fff",
            padding: "5px",
            borderRadius: "5px",
            display: "inline-block",
            marginRight: "10px"
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;