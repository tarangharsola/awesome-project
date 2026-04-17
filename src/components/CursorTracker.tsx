{"import React from 'react';
import { useState, useEffect } from 'react';

interface Cursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface Props {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: Props) => {
  const [activeCursors, setActiveCursors] = useState(cursors);

  useEffect(() => {
    setActiveCursors(cursors);
  }, [cursors]);

  return (
    <div>
      {activeCursors.map((cursor) => (
        <div key={cursor.id} style={{
          position: 'absolute',
          left: cursor.x,
          top: cursor.y,
          width: '5px',
          height: '5px',
          backgroundColor: cursor.color,
          borderRadius: '50%',
        }}>
          {cursor.name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;