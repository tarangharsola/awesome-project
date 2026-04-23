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
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user">
          <span className="username">{user.username}</span>
          <span className="color" style={{ backgroundColor: user.color }}></span>
        </div>
      ))}
    </div>
  );
};

export default UserList;