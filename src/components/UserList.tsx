{"import React from 'react';
import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

const UserList = ({ users }) => {
  const [ws, setWs] = useState(new WebSocket('ws://localhost:8080'));

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleUserJoin = (user) => {
    console.log(`User ${user} joined`);
  };

  const handleUserLeave = (user) => {
    console.log(`User ${user} left`);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user}>{user}</div>
      ))}
    </div>
  );
};

export default UserList;