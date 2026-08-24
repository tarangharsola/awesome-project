import React from 'react';
import { CursorData } from '../types';

type Props = {
  cursor: CursorData;
};

export const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, color, name } = cursor;
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    pointerEvents: 'none',
    zIndex: 10,
  };

  const caretStyle: React.CSSProperties = {
    width: '2px',
    height: '1.2em',
    backgroundColor: color,
    display: 'inline-block',
  };

  const labelStyle: React.CSSProperties = {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    marginTop: '-1.2em',
    marginLeft: '4px',
  };

  return (
    <div style={containerStyle}>
      <span style={caretStyle} />
      <div style={labelStyle}>{name}</div>
    </div>
  );
};
