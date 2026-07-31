{"import React from 'react';
import User from './User';

const UserList = ({ users, cursorPositions }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <User user={user} cursorPosition={cursorPositions[user.id]} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;