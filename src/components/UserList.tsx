import React from 'react';
import { useWebSocket } from './useWebSocket';

const UserList = () => {
  const { users, cursors } = useWebSocket();
  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
      {cursors.map((cursor, index) => (
        <div key={index}>{cursor.name}</div>
      ))}
    </div>
  );
};

export default UserList;