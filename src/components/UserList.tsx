{"import React from 'react';
import { useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    const handleUserListChange = (users) => {
      setUsers(users);
    };

    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => handleUserListChange(JSON.parse(event.data));
    return () => socket.close();
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