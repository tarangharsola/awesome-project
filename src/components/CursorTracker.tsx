{"import React from 'react';
import { useCursor } from '../useCursor';

interface Props {
  cursor: any;
}

const CursorTracker = ({ cursor }: Props) => {
  const { name, color } = useCursor();
  return (
    <div style={{
      position: 'absolute',
      top: cursor.y,
      left: cursor.x,
      width: '10px',
      height: '10px',
      backgroundColor: color,
      borderRadius: '50%',
    }}>
      {name}
    </div>
  );
};

export default CursorTracker;