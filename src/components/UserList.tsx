{"import React, { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function UserList({ users, onUserJoin, onUserLeave }) {
  const [usersState, setUsersState] = useState(users);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsersState(data.users);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleUserJoin = (user) => {
    onUserJoin(user);
  };

  const handleUserLeave = (user) => {
    onUserLeave(user);
  };

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {usersState.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;