{"import React, { useState } from 'react';
import { User } from './types';

function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => handleUserSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;