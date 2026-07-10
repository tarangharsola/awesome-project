{"import React from 'react';
import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function UserList({ users }) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleUserJoin = (user) => {
    console.log(`User ${user.name} joined`);
  };

  const handleUserLeave = (user) => {
    console.log(`User ${user.name} left`);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;