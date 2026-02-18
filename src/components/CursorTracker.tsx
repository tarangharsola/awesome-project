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
  const [activeCursors, setActiveCursors] = useState([]);

  useEffect(() => {
    const activeCursors = cursors.filter((cursor) => cursor.isActive);
    setActiveCursors(activeCursors);
  }, [cursors]);

  return (
    <div>
      {activeCursors.map((cursor) => (
        <div key={cursor.id} style={{
          backgroundColor: cursor.color,
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px'
        }}>
          {cursor.name} ({cursor.position})
        </div>
      ))}
    </div>
  );
};

export default CursorTracker;