{"import React from 'react';
import { User } from './User';

interface Props {
  user: User;
}

const CursorTracker = ({ user }: Props) => {
  return (
    <div className="cursor-tracker">
      <span className="cursor-label" style={{
        backgroundColor: user.color,
        color: "#fff",
        padding: "2px 4px",
        borderRadius: "4px",
      }}>
        {user.cursorPosition}
      </span>
    </div>
  );
};

export default CursorTracker;