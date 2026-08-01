{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  user: { id: string; name: string; color: string; }
}

const User = ({ user }: Props) => {
  const { id, name, color } = user;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      color: color,
    }}>
      <span>{name}</span>
      <span style={{
        marginLeft: 10,
      }}>{id}</span>
    </div>
  );
}

export default User;