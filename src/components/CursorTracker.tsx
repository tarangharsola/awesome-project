{"import React from 'react';
import { useEditor } from './useEditor';
import { useCursor } from './useCursor';

const CursorTracker = () => {
  const editor = useEditor();
  const cursor = useCursor();

  return (
    <div className="cursor-tracker">
      <span>{cursor.name}</span>
      <span>{cursor.position}</span>
    </div>
  );
};

export default CursorTracker;