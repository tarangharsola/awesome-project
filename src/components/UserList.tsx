{"import React from 'react';
import { useState } from 'react';
import { users } from './users';

function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => handleUserSelect(user)}>
          <span style={{ backgroundColor: user.color }}>{user.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default UserList;