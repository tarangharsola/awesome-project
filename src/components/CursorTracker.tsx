{"import React from 'react';
import { useState, useEffect } from 'react';
import { useCursor } from '../useCursor';

const CursorTracker = () => {
  const [cursor, setCursor] = useState({} as any);
  const { cursor: remoteCursor } = useCursor();

  useEffect(() => {
    setCursor(remoteCursor);
  }, [remoteCursor]);

  return (
    <div className="cursor-tracker">
      <span style={{
        position: 'absolute',
        top: cursor.top,
        left: cursor.left,
        backgroundColor: cursor.color,
        width: '5px',
        height: '5px',
        borderRadius: '50%'
      }}/>
    </div>
  );
};

export default CursorTracker;