{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  user: { name: string; color: string; }
}

const User: React.FC<Props> = ({ user }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: 10,
    }}>
      <div style={{
        backgroundColor: user.color,
        width: 10,
        height: 10,
        borderRadius: '50%',
      }} />
      <span style={{
        marginLeft: 10,
      }}>{user.name}</span>
    </div>
  );
}

export default User;