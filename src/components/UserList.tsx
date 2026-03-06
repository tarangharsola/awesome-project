{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    WebSocket.onMessage((message) => {
      if (message.type === 'userList') {
        setUsers(message.users);
      }
    });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;