{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

const UserList = ({ users }) => {
  const [usersState, setUsersState] = useState(users);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsersState(data.users);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ul>
      {usersState.map((user, index) => (
        <li key={index}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
};

export default UserList;