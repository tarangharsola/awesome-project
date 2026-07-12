{"import React from 'react';
import { useState, useEffect } from 'react';
import { users } from './users';

function UserList({ users }) {
  const [userList, setUserList] = useState(users);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <ul>
      {userList.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;