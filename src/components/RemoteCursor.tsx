import React from 'react';
import { RemoteCursorProps } from '../types';

export const RemoteCursor: React.FC<RemoteCursorProps> = ({
  position,
  color,
  name,
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    borderLeft: `2px solid ${color}`,
    height: '1em',
    pointerEvents: 'none',
  };

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-1.2em',
    left: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };

  return (
    <div style={style}>
      <div style={labelStyle}>{name}</div>
    </div>
  );
};