{"import React from 'react';

interface UserProps {
  user: { id: string; name: string; color: string };
}

const User = ({ user }: UserProps) => {
  return (
    <div className="user" style={{ backgroundColor: user.color }}>
      <span>{user.name}</span>
    </div>
  );
};

export default User;"