import React from 'react';
import { CursorData } from '../types';

type Props = {
  cursor: CursorData;
};

const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, name, color } = cursor;
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    pointerEvents: 'none',
    zIndex: 10,
  };
  const caretStyle: React.CSSProperties = {
    width: '2px',
    height: '1.2em',
    backgroundColor: color,
    animation: 'blink 1s steps(2, start) infinite',
  };
  const labelStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.6)',
    color: color,
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    marginTop: '-1.2em',
  };
  return (
    <div style={containerStyle}>
      <div style={caretStyle} />
      <div style={labelStyle}>{name}</div>
    </div>
  );
};

export default RemoteCursor;
