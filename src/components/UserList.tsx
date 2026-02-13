{"import React from 'react';
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: 10,
          borderRadius: 5,
        }}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;