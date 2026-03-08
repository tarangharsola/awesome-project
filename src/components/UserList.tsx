{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { id: string; name: string; color: string }[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [usersState, setUsersState] = useState(users);

  useEffect(() => {
    setUsersState(users);
  }, [users]);

  return (
    <ul>
      {usersState.map((user) => (
        <li key={user.id} style={{
          backgroundColor: user.color,
          padding: 10,
        }}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;