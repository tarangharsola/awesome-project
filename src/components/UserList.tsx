{"import React from 'react';
import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

function UserList({ users }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleUserJoin = (user) => {
    setUserList((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUserList((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  return (
    <ul>
      {userList.map((user) => (
        <li key={user.id}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
}

export default UserList;