{"import React from 'react';
import { User } from './User';

interface Props {
  user: User;
}

const CursorTracker = ({ user }: Props) => {
  return (
    <div className="cursor-tracker">
      <span style={{
        backgroundColor: user.color,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '8px'
      }}>
        {user.name}
      </span>
      <span>{user.cursorPosition}</span>
    </div>
  );
};

export default CursorTracker;