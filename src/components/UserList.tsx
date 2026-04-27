{"import React from 'react';
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    // fetch users from server
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users);
      setColors(data.colors);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: colors[user.id],
          padding: '5px',
          borderRadius: '5px',
          color: '#fff',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;