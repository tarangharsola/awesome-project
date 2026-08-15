{"import React from 'react';

interface UserProps {
  username: string;
  color: string;
  cursorPosition: number;
}

const User = ({ username, color, cursorPosition }: UserProps) => {
  return (
    <div className="user">
      <span className="username">{username}</span>
      <span className="cursor-label" style={{
        backgroundColor: color,
        color: "#fff",
        padding: "2px 4px",
        borderRadius: "4px",
      }}>
        {cursorPosition}
      </span>
    </div>
  );
};

export default User;