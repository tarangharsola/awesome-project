import React from 'react';
import { CursorData } from '../types';

type Props = {
  cursor: CursorData;
};

const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, user } = cursor;
  const style: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    borderLeft: `2px solid ${user.color}`,
    height: '1em',
    pointerEvents: 'none',
  };
  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-1.2em',
    left: 0,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  };
  return (
    <div className="remote-cursor" style={style}>
      <div className="cursor-label" style={labelStyle}>{user.name}</div>
    </div>
  );
};

export default RemoteCursor;
