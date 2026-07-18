{"import React from 'react';
import { useState } from 'react';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const handleUserJoin = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };

  return (
    <ul>
      {users.map((user) => (
        <User key={user.id} user={user} onLeave={handleUserLeave} />
      ))}
    </ul>
  );
};

export default UserList;