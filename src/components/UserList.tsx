{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function UserList({ users }) {
  const [usersState, setUsersState] = useState(users);

  useEffect(() => {
    setUsersState(users);
  }, [users]);

  const handleUserJoin = (user) => {
    setUsersState((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsersState((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  return (
    <ul>
      {usersState.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;