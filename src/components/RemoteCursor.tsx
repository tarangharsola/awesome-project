import React from 'react';
import { CursorData } from '../types';

type Props = {
  cursor: CursorData;
};

export const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { x, y, username } = cursor;
  return (
    <div
      className="remote-cursor"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div
        className="cursor-label"
        style={{
          backgroundColor: 'rgba(30, 30, 30, 0.85)',
          color: '#fff',
          padding: '2px 4px',
          borderRadius: '3px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {username}
      </div>
    </div>
  );
};
