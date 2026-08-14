{"import React from 'react';
import { useUser } from '../utils/useUser';

interface UserProps {
  user: { name: string; color: string; }
}

const User = ({ user }: UserProps) => {
  const { name, color } = user;
  return (
    <div style={{
      padding: 10,
      backgroundColor: color,
    }}>
      {name}
    </div>
  );
}

export default User;