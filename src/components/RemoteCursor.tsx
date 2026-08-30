import React from 'react';
import { CursorData } from '../types/editor';

type Props = {
  cursor: CursorData;
};

export const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, user } = cursor;
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    pointerEvents: 'none',
    zIndex: 10,
  };

  const labelStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    marginTop: '-1.2em',
  };

  const cursorStyle: React.CSSProperties = {
    width: '2px',
    height: '1.2em',
    backgroundColor: user.color,
    marginLeft: '-1px',
  };

  return (
    <div style={style}>
      <div style={cursorStyle} />
      <div style={labelStyle}>{user.name}</div>
    </div>
  );
};