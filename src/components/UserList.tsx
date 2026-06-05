{"import React from 'react';
import { useWebSocket } from './useWebSocket';

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default UserList;