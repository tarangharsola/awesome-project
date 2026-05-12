{"import React from 'react';
import { useState } from 'react';

function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user} onClick={() => handleUserSelect(user)} style={{ backgroundColor: user.color, padding: 10, margin: 10, borderRadius: 10, cursor: 'pointer' }}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;