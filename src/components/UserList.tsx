import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const user = JSON.parse(event.data);
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <span style={{ color: user.color }}>{user.username}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;