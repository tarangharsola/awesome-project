{"import React from 'react';
import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const UserList = ({ users }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  const handleUserJoin = (user) => {
    console.log(`User ${user.name} joined`);
  };

  const handleUserLeave = (user) => {
    console.log(`User ${user.name} left`);
  };

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;