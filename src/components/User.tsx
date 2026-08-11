{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  user: { name: string; color: string }
}

const User: React.FC<Props> = ({ user }) => {
  const { name, color } = user;
  return (
    <div style={{
      backgroundColor: color,
      padding: 10,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
    }}>
      {name}
    </div>
  );
}

export default User;