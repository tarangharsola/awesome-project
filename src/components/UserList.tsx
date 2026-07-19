{"import React from 'react';
import { useState } from 'react';
import User from './User';

function UserList({ users }) {
  const [usersState, setUsersState] = useState(users);

  const handleUserJoin = (user) => {
    setUsersState((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsersState((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };

  return (
    <ul>
      {usersState.map((user) => (
        <li key={user.id}>
          <User user={user} onJoin={handleUserJoin} onLeave={handleUserLeave} />
        </li>
      ))}
    </ul>
  );
}

export default UserList;