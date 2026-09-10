import React from 'react';
import './RemoteCursor.css';

type RemoteCursorProps = {
  userId: string;
  userName: string;
  color: string;
  x: number;
  y: number;
};

export const RemoteCursor: React.FC<RemoteCursorProps> = ({ userId, userName, color, x, y }) => {
  const cursorStyle: React.CSSProperties = {
    position: 'absolute',
    left: x,
    top: y,
    transform: 'translate(-50%, -100%)',
    pointerEvents: 'none',
    zIndex: 10,
  };

  const caretStyle: React.CSSProperties = {
    width: '2px',
    height: '1.2em',
    backgroundColor: color,
    animation: 'blink 1s step-start infinite',
  };

  const labelStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    marginTop: '-1.5em',
  };

  return (
    <div style={cursorStyle} data-user-id={userId}>
      <div style={caretStyle} />
      <div style={labelStyle}>{userName}</div>
    </div>
  );
};