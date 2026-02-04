{"import React from 'react';
import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface UserListProps {
  users: { id: string; name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
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
          borderRadius: 5,
        }}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;