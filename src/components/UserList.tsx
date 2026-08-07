{"import React from 'react';
import { useState } from 'react';

function UserList({ users, onUserJoin, onUserLeave }) {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  const handleUserJoin = (user) => {
    onUserJoin(user);
  };

  const handleUserLeave = (user) => {
    onUserLeave(user);
  };

  return (
    <ul>
      {usersList.map((user) => (
        <li key={user.id}>{user.name} ({user.color})</li>
      ))}
    </ul>
  );
}

export default UserList;