{"import React from 'react';
import { useState, useEffect } from 'react';

interface Cursor {
  id: string;
  name: string;
  color: string;
  position: number;
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
      {activeCursors.map((cursor, index) => (
        <div key={index} style={{
          backgroundColor: cursor.color,
          position: 'absolute',
          top: cursor.position,
          left: 0,
          width: '2px',
          height: '10px',
          borderRadius: '5px',
        }}>
          {cursor.name}
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;