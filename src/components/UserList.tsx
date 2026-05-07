{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { users: usersFromContext, join, leave } = useUsers();

  useEffect(() => {
    setUsers(usersFromContext);
  }, [usersFromContext]);

  const handleJoin = (user) => {
    join(user);
  };

  const handleLeave = (user) => {
    leave(user);
  };

  return (
    <div>
      <h2>Active Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} style={{
            backgroundColor: user.color,
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
          onClick={() => handleJoin(user)}
        >
          {user.name}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;