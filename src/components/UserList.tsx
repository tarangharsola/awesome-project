{"import React from 'react';
import { useState, useEffect } from 'react';

function UserList({ users }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <ul>
      {userList.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;