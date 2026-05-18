{"import React from 'react';
import { useState, useEffect } from 'react';
import { Cursor } from './Cursor';

interface CursorTrackerProps {
  cursors: Cursor[];
}

const CursorTracker = ({ cursors }: CursorTrackerProps) => {
  const [activeCursors, setActiveCursors] = useState(cursors);

  useEffect(() => {
    setActiveCursors(cursors);
  }, [cursors]);

  return (
    <div className="cursor-tracker">
      {activeCursors.map((cursor, index) => (
        <Cursor key={index} cursor={cursor} />
      ))}
    </div>
  );
};

export default CursorTracker;