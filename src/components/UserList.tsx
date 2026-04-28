{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: usersState, error, loading } = useUsers();

  useEffect(() => {
    setUsers(usersState);
  }, [usersState]);

  if (loading) return <div>Loading...</div);
  if (error) return <div>Error: {error.message}</div);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;