{"import React from 'react';
import { useColor } from './useColor';

const User = ({ user, onClick }) => {
  const color = useColor(user.id);
  return (
    <div className="user" style={{ backgroundColor: color }} onClick={onClick}>
      <span>{user.name}</span>
    </div>
  );
};

export default User;