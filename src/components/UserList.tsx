{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../store/usersReducer';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: usersState } = useUsers();

  useEffect(() => {
    setUsers(usersState);
  }, [usersState]);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          padding: '5px',
          borderRadius: '5px',
          color: 'white',
          display: 'inline-block',
          margin: '5px'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;