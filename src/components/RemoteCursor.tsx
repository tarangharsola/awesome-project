import React from 'react';
import { Cursor, User } from '../types/collaboration';
import './RemoteCursor.css';

interface RemoteCursorProps {
  cursor: Cursor;
  user: User;
}

export const RemoteCursor: React.FC<RemoteCursorProps> = ({ cursor, user }) => {
  const style = {
    left: `${cursor.position * 8}px`,
    borderLeftColor: user.color,
  } as React.CSSProperties;
  return (
    <div className="remote-cursor" style={style}>
      <span className="cursor-label" style={{ backgroundColor: user.color }}>
        {user.name}
      </span>
    </div>
  );
};