{"import React from 'react';
import { useState } from 'react';
import User from './User';

function UserList({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} onSelect={handleUserSelect} />
      ))}
    </div>
  );
}

export default UserList;