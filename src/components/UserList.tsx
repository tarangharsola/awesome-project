{"import React, { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: usersFromHook } = useUsers();

  useEffect(() => {
    setUsers(usersFromHook);
  }, [usersFromHook]);

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
          padding: 10,
          borderRadius: 10,
        }}>
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;