{"import React from 'react';
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserUpdate = (user) => setUsers((prevUsers) => [...prevUsers, user]);
    const handleUserRemove = (id) => setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
          padding: 10,
          borderRadius: 10,
        }}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;