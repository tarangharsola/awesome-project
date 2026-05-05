{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../store/usersReducer';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: usersFromStore, loadUsers } = useUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      {usersFromStore.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          margin: '5px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;