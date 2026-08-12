{"import React from 'react';
import { useUsers } from './useUsers';

interface UserProps {
  user: { id: string; name: string; color: string; }
}

const User = ({ user }: UserProps) => {
  const { id, name, color } = user;

  return (
    <div
      style={{
        backgroundColor: color,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {name}
    </div>
  );
}

export default User;