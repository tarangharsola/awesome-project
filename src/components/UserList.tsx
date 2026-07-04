{"import React from 'react';
import { useState } from 'react';

function UserList({ users, onUserJoin, onUserLeave }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} onClick={() => handleUserClick(user)}>
          <span>{user.name}</span>
          <span>{user.color}</span>
        </div>
      ))}
      {selectedUser && (
        <div>
          <span>{selectedUser.name}</span>
          <span>{selectedUser.color}</span>
        </div>
      )}
    </div>
  );
}

export default UserList;