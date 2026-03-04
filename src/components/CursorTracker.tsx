{"import React from 'react';
import { useCursor } from './useCursor';

interface Props {
  cursor: { x: number; y: number; }
  username: string;
  color: string;
}

const CursorTracker: React.FC<Props> = ({ cursor, username, color }) => {
  return (
    <div style={{
      position: 'absolute',
      left: cursor.x,
      top: cursor.y,
      width: 2,
      height: 10,
      backgroundColor: color,
      borderRadius: '50%',
    }}>
      {username}
    </div>
  );
}

export default CursorTracker;