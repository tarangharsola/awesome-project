{"import React from 'react';
import { useState } from 'react';
import { users } from './users';

function UserList({ users, cursorPositions }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} onClick={() => handleUserSelect(user)}>
          <span>{user.name}</span>
          <span>{user.color}</span>
        </div>
      ))}
      {selectedUser && (
        <div>
          <span>{selectedUser.name}</span>
          <span>{selectedUser.color}</span>
          <span>Cursor Position: {cursorPositions[selectedUser.id]}</span>
        </div>
      )}
    </div>
  );
}

export default UserList;