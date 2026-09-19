import React from 'react';
import type { CursorData } from '../types/editor';
import './RemoteCursor.css';

interface Props {
  cursor: CursorData;
}

export const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, color, name } = cursor;
  const style: React.CSSProperties = {
    left: `${position.column * 8}px`,
    top: `${position.line * 18}px`,
    borderColor: color
  };
  return (
    <div className="remote-cursor" style={style}>
      <span className="cursor-label" style={{ backgroundColor: color }}>
        {name}
      </span>
    </div>
  );
};
