{"import React from 'react';
import { useEditor } from './useEditor';

interface CursorTrackerProps {
  editor: useEditor;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ editor }) => {
  const { cursors } = editor;
  return (
    <div>
      {cursors.map((cursor, index) => (
        <div key={index}>{cursor.name}</div>
      ))}
    </div>
  );
};

export default CursorTracker;