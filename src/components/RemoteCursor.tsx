import React from 'react';
import { CursorData } from '../types';

export const RemoteCursor: React.FC<{ cursor: CursorData }> = ({ cursor }) => {
  const { position, user } = cursor;

  const cursorStyle: React.CSSProperties = {
    position: 'absolute',
    top: position.top,
    left: position.left,
    borderLeft: `2px solid ${user.color}`,
    height: '1em',
    pointerEvents: 'none',
  };

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    top: -20,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };

  return (
    <div style={cursorStyle}>
      <div style={labelStyle}>{user.name}</div>
    </div>
  );
};
