{"import React from 'react';
import { useUsers } from './useUsers';

interface UserProps {
  user: { name: string; color: string }
}

const User = ({ user }) => {
  const { name, color } = user;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      backgroundColor: color,
      borderRadius: 10,
      border: '1px solid black'
    }}>
      {name}
    </div>
  );
}

export default User;