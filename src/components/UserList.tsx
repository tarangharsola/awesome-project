{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

function UserList() {
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
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;