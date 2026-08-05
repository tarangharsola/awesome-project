{"import React from 'react';
import { useState } from 'react';
import User from './User';

function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => handleUserSelect(user)}>
          <User user={user} selected={selectedUser === user} />
        </li>
      ))}
    </ul>
  );
}

export default UserList;