{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function UserList({ users, cursorPositions }) {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  const handleUserJoin = (user) => {
    setActiveUsers([...activeUsers, user]);
  };

  const handleUserLeave = (user) => {
    setActiveUsers(activeUsers.filter((u) => u !== user));
  };

  return (
    <div>
      <h2>Active Users:</h2>
      <ul>
        {activeUsers.map((user) => (
          <li key={user} style={{ color: user.color }}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;