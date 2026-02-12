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
    <div className="cursors">
      {activeCursors.map((cursor, index) => (
        <div key={index} style={{
          backgroundColor: cursor.color,
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          marginRight: '10px',
        }}>
          {cursor.name} ({cursor.position})
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;