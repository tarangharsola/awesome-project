{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { connection } = useWebSocket();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    connection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'user_join') {
        handleUserJoin(data.user);
      } else if (data.type === 'user_leave') {
        handleUserLeave(data.user);
      }
    };
  }, []);

  return (
    <div id="user-list">
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: 10,
        }}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;